import common from '../../common/js/common.js';
import Vue from 'vue';

const app = {
    state: {
        screenPower:false,
        tableMaxHeight:'auto',

    },
    mutations: {
        setScreenPower:function (state,no) {
            state.screenPower = no;
            console.log('state---',state,no)
        },
        updateTableMaxHeight(state){
            var currentHeight = document.getElementById('consoleCurrentHeight');
            var _height = currentHeight.offsetHeight;
            if(_height != undefined){
                state.tableMaxHeight = common.gwh() - (148+_height)
            }else{
                state.tableMaxHeight = common.gwh() - 300;
            }

        }
    }
};

export default app;
