export default {
    nextStructure: (state, currentStructure) =>  {state.currentStructure = currentStructure},
    nextFeedback: (state, currentFeedback) =>  {state.currentFeedback = currentFeedback},
    setTrace: (state, trace) => { state.trace = trace }
}