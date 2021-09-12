import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EpisodeType } from '../pages/Episodes'; // TODO declare it here
import type { RootState } from '../store/types';

const episodesUrl = 'https://rickandmortyapi.com/api/episode';

interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface ApiResponse<R = Record<string, unknown>[]> {
  info?: Info;
  results?: R[];
  error?: string;
}

export const fetchEpisodes = createAsyncThunk<
  ApiResponse<EpisodeType>,
  string | undefined,
  {
    state: RootState;
    rejectValue: ApiResponse['error'];
  }
>(
  'episodes/fetchEpisodes',
  async (url = episodesUrl, { getState, rejectWithValue, dispatch }) => {
    // TODO catch
    const episodesResponse = await fetch(url);

    const response = await episodesResponse.json(); // XXX type

    if (await response.error) {
      return rejectWithValue(response.error);
    }

    if (await response.info?.next) {
      dispatch(fetchEpisodes(response.info.next));
    }

    return await response;
  }
);

interface EpisodesState {
  status?: string;
  list: { [id: string]: EpisodeType };
}

const initialState: EpisodesState = {
  status: '',
  list: {},
};

const episodesSlice = createSlice({
  name: 'episodes',
  initialState,
  reducers: {
    renameEpisode(state, action: PayloadAction<{ id: string; title: string }>) {
      const { id, title } = action.payload;

      state.list[id].name = title;
    },
    deleteEpisode(state, action: PayloadAction<string>) {
      delete state.list[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEpisodes.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(fetchEpisodes.rejected, (state, { payload }) => {
      state.status = payload;
    });
    builder.addCase(fetchEpisodes.fulfilled, (state, { payload }) => {
      state.status = 'fulfilled';

      if (Array.isArray(payload.results)) {
        payload.results.forEach((episode) => {
          state.list[episode.id] = episode;
        });
      }
    });
  },
});

export const { renameEpisode, deleteEpisode } = episodesSlice.actions;

export const selectEpisodes = (state: RootState) => state.episodes.list;

export default episodesSlice.reducer;
