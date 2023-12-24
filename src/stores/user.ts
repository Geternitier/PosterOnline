import { defineStore } from 'pinia'

export const useUserStore = defineStore('user',
    {
    state: () => {
        return {
            username: '',
            name: '',
            phone: '',
            status: false
        }
    },
    getters: {
        getUserName(){
        }
    },
    actions: {
        update(username: string, name: string, phone: string, status: boolean){
            this.username = username;
            this.name = name;
            this.phone = phone;
            this.status = status;
        },
        reset(){
            this.username = '';
            this.name = '';
            this.phone = '';
            this.status = false;
        }
    },
    persist: {
        enabled: true
    }
})