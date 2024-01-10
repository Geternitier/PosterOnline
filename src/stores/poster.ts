import {defineStore} from "pinia";
import axios from "axios";
import {SERVER_ADDR} from "@/config";
import {ElNotification} from "element-plus";

export class Poster {
    constructor(
        name: string,
        date: string,
        depart: string,
        describ: string,
        filepath: string) {
        this.name = name
        this.date = date
        this.department = depart
        this.description = describ
        this.filepath = filepath
    }

    name= ''
    date= ''
    department = ''
    description = ''
    filepath = ''
}

const status2int = ["已审核", "未审核", "已撤回", "未撤回"]

const postersList: Poster[] = []

export const usePosterStore = defineStore('poster',
    {
        state: () => {
            return {
                posters: postersList
            }
        },
        getters: {
            getPosters(){
            }
        },
        actions: {
            update(content: string) {
                let num = status2int.indexOf(content) + 1
                if(num===0){
                    num = 4
                }
                const updateUrl = SERVER_ADDR + '/api/posters' + num
                console.log("GET "+updateUrl)
                axios.get(updateUrl)
                    .then(response => {
                        this.posters = response.data
                        console.log(this.posters)
                    })
                    .catch(error => {
                        console.log(error)
                        ElNotification({
                            offset: 70,
                            title: '更新' + content + '海报错误'
                        })
                        return
                    })
            }
        }
    })