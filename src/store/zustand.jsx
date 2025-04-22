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

      fetchQuestion: async (query) => {
        try {
          const response = await fetch(`https://opentdb.com/api.php${query}`);

          if (!response.ok) {
            // Handle 429 or other errors
            return set((state) => ({
              ...state,
              error: `Failed to fetch questions. Status: ${response.status}`,
              question: [],
            }));
          }

          const data = await response.json();

          // Check response code from OpenTDB API
          if (data.response_code !== 0 || !Array.isArray(data.results)) {
            return set((state) => ({
              ...state,
              error: "No questions available or invalid response.",
              question: [],
            }));
          }

          // Successful fetch
          return set((state) => ({
            ...state,
            question: data.results,
            error: null,
          }));
        } catch (error) {
          return set((state) => ({
            ...state,
            error: error.message || "Unknown error occurred.",
            question: [],
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
