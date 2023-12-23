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
        }
    }
})