export default {
    nextFeedback: (state, currentFeedback) =>  state.currentFeedback = currentFeedback,
    setTrace: (state, trace) => state.trace = trace,
    setIdCase: (state, id_case) => state.id_case = id_case,
    setIndex: (state, index) => state.index = index,
    setConfirm: (state, confirm) => state.confirm = confirm,
    setAssessment: (state, assessment) => state.assessment = assessment,
    pushAssessment: (state, assessment) => state.assessments.push(assessment),
    setProgress: (state, progress) => state.progress = progress,
    updateProgress: (state, { index, isBlock }) => state.progress[index].isBlock = isBlock,
    pushProgress: (state, progress) => state.progress.push(progress),
    setShowFinishButton: (state, finish) => state.showFinishButton = finish,
    setShowBackButton: (state, back) => state.showBackButton = back,

}