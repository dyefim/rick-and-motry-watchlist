import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiResponse, EpisodeType } from '../types';
import type { RootState } from '../store/types';

const episodesUrl = 'https://rickandmortyapi.com/api/episode';

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
    const episodesResponse = await fetch(url);

    const response =
      (await episodesResponse.json()) as ApiResponse<EpisodeType>;

    if (response.error) {
      return rejectWithValue(response.error);
    }

    if (response.info?.next) {
      dispatch(fetchEpisodes(response.info.next));
    }

    return response;
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
