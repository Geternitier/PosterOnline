import {defineStore} from "pinia";
import axios from "axios";
import {SERVER_ADDR} from "@/config";
import {ElNotification} from "element-plus";

export class Poster {
    constructor(name: string,
                date: string,
                depart: string,
                describ: string,
                url: string) {
        this.name = name
        this.date = date
        this.department = depart
        this.description = describ
        this.url = url
    }

    name= ''
    date= ''
    department = ''
    description = ''
    url = ''
}

const status2int = ["已审核", "未审核", "已撤回", "未撤回"]

const postersList = [
    new Poster(
        "神高达",
        "2012-11-11",
        "高达部",
        "多蒙·卡修。新日本，made in China",
        "https://router.vuejs.org/logo.svg")
]

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
                const num = status2int.indexOf(content) + 1
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