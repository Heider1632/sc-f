export default {
    nextFeedback: (state, currentFeedback) =>  state.currentFeedback = currentFeedback,
    setTrace: (state, trace) => state.trace = trace,
    setIdCase: (state, id_case) => state.id_case = id_case,
    setIndex: (state, index) => state.index = index,
    setConfirm: (state, confirm) => state.confirm = confirm,
    setResources: (state, resources) => state.resources = resources,
    setAssessments: (state, assessments) => state.assessments = assessments,
    pushAssessment: (state, assessment) => state.assessments.push(assessment),
    pushAssessmentIndex: (state, assessment, index) => state.assessments[index] = assessment,
    reorderProgress: (state) => state.progress = state.progress.sort((a,b) => { 
        if(a.index > b.index) return 1;
        if(a.index < b.index) return -1;
        return 0;
     }),
    setProgress: (state, progress) => state.progress = progress,
    updateProgress: (state, { index, isBlock }) => state.progress[index].isBlock = isBlock,
    pushProgress: (state, progress) => state.progress.push(progress),
    setShowFinishButton: (state, finish) => state.showFinishButton = finish,
    setShowBackButton: (state, back) => state.showBackButton = back,
    setWin: (state, win) => state.win = win

}