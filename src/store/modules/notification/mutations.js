export default {
    open: (state, arg) => { 

        state.color = arg.color;
        state.message = arg.message;
        state.submessage = arg.submessage;
        
        for (const loc of arg.pos) {
            state[loc] = true;
        }

        state.snackbar = true;
        
    },
    dismiss: (state) => {
        state.snackbar = false;
        state.color = null;
        state.message = null;
        state.submessage = null;
        let pos = ['right', 'bottom', 'top', 'left']

        for (const loc of pos) {
            if (state[loc] != false) {
                state[loc] == false
            } 
        }
    }
}