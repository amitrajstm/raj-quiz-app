// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// const useQuestionStore = create(
//   persist(
//     (set) => ({
//       question: [],
//       userAnswer: [],
//       error: null,
//       totalTime: 0,
//       trueAnswer: 0,
//       falseAnswer: 0,
//       auth: {},
//       page: 1,
//       fetchQuestion: async (query) => {
//         try {
//           const response = await fetch(`https://opentdb.com/api.php${query}`);

//           const data = await response.json();

//           return set((state) => ({ ...state, question: data.results }));
//         } catch (error) {
//           return set((state) => ({ ...state, error: error }));
//         }
//       },

//       authUser: (auth) => set((state) => ({ ...state, auth })),
//       addAnswer: ({ question, answer }) =>
//         set((state) => ({
//           ...state,
//           userAnswer: [...state.userAnswer, { question, answer }],
//         })),
//       trueAction: () =>
//         set((state) => ({ ...state, trueAnswer: state.trueAnswer + 1 })),
//       falseAction: () =>
//         set((state) => ({ ...state, falseAnswer: state.falseAnswer + 1 })),
//       logoutUser: () =>
//         set({
//           question: [],
//           userAnswer: [],
//           error: null,
//           totalTime: 0,
//           trueAnswer: 0,
//           falseAnswer: 0,
//           auth: {},
//           page: 1,
//         }),
//       resetQuestion: () =>
//         set((state) => ({
//           ...state,
//           question: [],
//           trueAnswer: 0,
//           falseAnswer: 0,
//           error: null,
//           page: 1,
//         })),
//       setTimeStamp: (time) =>
//         set((state) => ({
//           ...state,
//           totalTime: time,
//         })),
//       nextPage: () =>
//         set((state) => ({
//           ...state,
//           page: state.page + 1,
//         })),
//     }),
//     {
//       name: "question-storage",
//     }
//   )
// );

// export default useQuestionStore;

import { create } from "zustand";
import { persist } from "zustand/middleware";

let lastFetchTime = 0;

const useQuestionStore = create(
  persist(
    (set) => ({
      question: [],
      userAnswer: [],
      error: null,
      totalTime: 0,
      trueAnswer: 0,
      falseAnswer: 0,
      auth: {},
      page: 1,
      loading: false,

      fetchQuestion: async (query) => {
        const now = Date.now();

        // Prevent rapid multiple requests
        if (now - lastFetchTime < 3000) {
          console.warn("Too fast! Please wait before fetching again.");
          return;
        }

        lastFetchTime = now;

        set((state) => ({ ...state, loading: true, error: null }));

        try {
          const response = await fetch(`https://opentdb.com/api.php${query}`);

          if (!response.ok) {
            return set((state) => ({
              ...state,
              error: `Failed to fetch questions. Status: ${response.status}`,
              question: [],
              loading: false,
            }));
          }

          const data = await response.json();

          if (data.response_code !== 0 || !Array.isArray(data.results)) {
            return set((state) => ({
              ...state,
              error: "No questions available or invalid response.",
              question: [],
              loading: false,
            }));
          }

          return set((state) => ({
            ...state,
            question: data.results,
            error: null,
            loading: false,
          }));
        } catch (error) {
          return set((state) => ({
            ...state,
            error: error.message || "Unknown error occurred.",
            question: [],
            loading: false,
          }));
        }
      },

      authUser: (auth) => set((state) => ({ ...state, auth })),

      addAnswer: ({ question, answer }) =>
        set((state) => ({
          ...state,
          userAnswer: [...state.userAnswer, { question, answer }],
        })),

      trueAction: () =>
        set((state) => ({ ...state, trueAnswer: state.trueAnswer + 1 })),

      falseAction: () =>
        set((state) => ({ ...state, falseAnswer: state.falseAnswer + 1 })),

      logoutUser: () =>
        set({
          question: [],
          userAnswer: [],
          error: null,
          totalTime: 0,
          trueAnswer: 0,
          falseAnswer: 0,
          auth: {},
          page: 1,
          loading: false,
        }),

      resetQuestion: () =>
        set((state) => ({
          ...state,
          question: [],
          trueAnswer: 0,
          falseAnswer: 0,
          error: null,
          page: 1,
        })),

      setTimeStamp: (time) =>
        set((state) => ({
          ...state,
          totalTime: time,
        })),

      nextPage: () =>
        set((state) => ({
          ...state,
          page: state.page + 1,
        })),
    }),
    {
      name: "question-storage",
    }
  )
);

export default useQuestionStore;
