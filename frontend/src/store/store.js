import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios.js";

export const useStore = create(
  persist(
    (set, get) => ({
      // Load all questions and save here
      allQuestions: [],

      // Filters for each page
      selectedTerm: null,
      selectedArea: null,
      selectedStudent: null,
      selectedCategory:null,

      // Questions based off previous selection
      filteredQuestions: [],

      //set Student names
      //studentNames:[],

      // Currently active student answers
      studentAnswers: {},

      // Loading and error states
      loading: false,
      error: null,

      // Fetch questions
      fetchQuestions: async () => {
        // Get all questions from the database
        set({ loading: true });
        try {
          const res = await axiosInstance.get("/questions");
          set({ allQuestions: res.data });

           // If there's a selected term, re-apply the filters
    const state = get();
    if (state.selectedTerm) {
      let filtered = res.data.filter(q => q.term === state.selectedTerm);
      
      if (state.selectedArea) {
        filtered = filtered.filter(q => q.area === state.selectedArea);
        
        if (state.selectedCategory) {
          filtered = filtered.filter(q => q.category === state.selectedCategory);
        }
      }
      
      set({ filteredQuestions: filtered });
    }


          console.log("Successfully fetched questions");

          console.log(res.data);

        } catch (error) {
          console.log("Error fetching questions", error);
        } finally {
          set({ loading: false });
        }
      },

      // Set the selected term and filter the questions
      setTerm: (term) => {
        const allQuestions = get().allQuestions;

        // Ensure allQuestions is an array before filtering
        if (!Array.isArray(allQuestions)) {
          console.error("allQuestions is not an array or is undefined");
          return;
        }

        set({
          selectedTerm: term,
          filteredQuestions: allQuestions.filter((q) => q.term === term), // Filter questions by term
        });
      },

      // Set the selected area and filter again
      setArea: (area) => {
        const { selectedTerm, allQuestions } = get(); // Get the values from these properties to mutate

        // Ensure allQuestions is an array before filtering
        if (!Array.isArray(allQuestions)) {
          console.error("allQuestions is not an array or is undefined");
          return;
        }

        set({
          selectedArea: area,
          filteredQuestions: allQuestions.filter(
            (q) => q.term === selectedTerm && q.area === area
          ),
        });
      },

      setCategory: (category)=>{
        const {selectedTerm, selectedArea, allQuestions} = get() 
        const filteredQuestions = allQuestions.filter(
          q=> q.term === selectedTerm &&
          q.area === selectedArea &&
          q.category === category
        );
        set({
          selectedCategory:category,
          filteredQuestions
        })
      },

      setStudent: async(studentId)=>{
        set({loading:true});
        try {
          const res = await axiosInstance.get(`/students/${studentId}/answers`)

          const answers = await res.data

          const answersMap = {}
          answers.forEach(answer=>{
            answersMap[answer.questionId] = answer.answer
          })/*
          takes the retrieved object 
           { questionId: "q123", answer: true, term: "autumn" }, 
            and converts it to this 
            q123:true
            q145:false
          */

            set({
              selectedStudent:studentId,
              studentAnswers:answersMap,
              loading:false

            })

        } catch (error) {
          console.error('Error retreiveing the answers', error)
          set({ error: error.message, loading: false });
        }
      },

      saveAnswer: async (questionId, answer)=>{ // this takes the question, and answer from user. if the user clicks yes to the question the answer is either yes or no. 
        const {selectedStudent, selectedTerm, studentAnswers} = get(); //takes the selected student , and get the students answers. 

        set({ // spreads the previous student answers(which should be empty) and sets the question(property) clicked with the answer provided as its value
          studentAnswers:{
            ...studentAnswers,
            [questionId]:answer
          }
         
        })

        try {
          await axiosInstance.post(`/students/${selectedStudent}/answers`,{
            questionId,
             answer,
             term:selectedTerm
          } )
        } catch (error) {
          set({error:error.response?.data?.message || error.message})
        }
      },
      
      resetSelections:()=>{
        set({
          selectedTerm: null,
          selectedArea: null,
          selectedStudent: null,
          filteredQuestions: [],
          studentAnswers: {},
          selectedCategory:null
        });
      }


      /*getStudents:async()=>{
        set({loading:true});
        try {
          const res = await axiosInstance.get("/students");
          set({studentNames:res.data})

        } catch (error) {
          console.log("Error getting students",error)
        }finally{
          set({loading:false})
        }
      }*/
      
    }),
    {
      name: "school-app-store", // Key for local storage
      partialize: (state) => ({
        // Specify which parts of the state to persist
        selectedTerm: state.selectedTerm,
        selectedArea: state.selectedArea,
        selectedCategory: state.selectedCategory,
        selectedStudent:state.selectedStudent,
        
        allQuestions:state.allQuestions
      }),
    }
  )
);