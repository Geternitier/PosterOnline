import {defineStore} from "pinia";

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

const postersList = [
    new Poster(
        "神高达",
        "2012-11-11",
        "高达部",
        "多蒙·卡修。新日本，made in China",
        "https://router.vuejs.org/logo.svg"),
    new Poster(
        "神高达",
        "2012-11-11",
        "高达部",
        "多蒙·卡修。新日本，made in China",
        "https://router.vuejs.org/logo.svg"),
    new Poster(
        "神高达",
        "2012-11-11",
        "高达部",
        "多蒙·卡修。新日本，made in China",
        "https://router.vuejs.org/logo.svg"),
    new Poster(
        "神高达",
        "2012-11-11",
        "高达部",
        "多蒙·卡修。新日本，made in China",
        "https://router.vuejs.org/logo.svg"),
    new Poster(
        "神高达",
        "2012-11-11",
        "高达部",
        "多蒙·卡修。新日本，made in China",
        "https://router.vuejs.org/logo.svg"),
    new Poster(
        "神高达",
        "2012-11-11",
        "高达部",
        "多蒙·卡修。新日本，made in China",
        "https://router.vuejs.org/logo.svg"),
    new Poster(
        "神高达",
        "2012-11-11",
        "高达部",
        "多蒙·卡修。新日本，made in China",
        "https://router.vuejs.org/logo.svg"),
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
            update(content: string){

            }
        }
    })