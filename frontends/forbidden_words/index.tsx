import { Cemjsx, front, Func, Static, Fn, Ref } from "cemjs-all"
import Navigation from "./navigation"


front.listener.finish = () => {
    return
}

front.func.getURL = function () {
    let url = `/api/ForbiddenWords?uuid=${localStorage.uuid}`
    if (Static.seach.length > 2) {
        url += `&seach=${Static.seach}`
        Static.currentPage = 1
    }
    if (Static.currentPage != 0) {
        url += `&page=${Static.currentPage}`
    }
    return url
}


front.func.makeRequest = async function () {
    let url = Func.getURL()

    const response = await fetch(url);
    Static.response = await response.json()
    Static.records = Static.response.records


    if (!Static.records) {
        Static.records = []
        Fn.init()
        return
    }


    Static.limitPerPage = 15
    Static.pageCount = Math.ceil(Static.response.totalFound / Static.limitPerPage)
    Static.Pages = []
    for (let i = 1; i <= Static.pageCount; i++) {
        Static.Pages.push({ number: i, class: 'pagination-number ' })
    }
    Static.lastPage = Static.Pages.at(-1).number
    Static.Pages[Static.currentPage - 1].class += 'active'
    Fn.init()
}

front.func.pagination = function () {

    Func.makeRequest()

    if (Static.currentPage == Static.End && Static.currentPage <= Static.lastPage - 2) {
        Ref.first_two.classList.remove('hidden')
        Static.Begin += 2
        Static.End += 2
    } else if (Static.currentPage == Static.End - 1 && Static.currentPage >= 5 && Static.currentPage <= Static.lastPage - 2) {
        Static.Begin += 1
        Static.End += 1
    } else if (Static.Begin == 2 && Static.currentPage <= 4) {
        Ref.first_two.classList.add('hidden')
        Static.Begin -= 2
        Static.End -= 2
    } else if (Static.Begin == 3 && Static.currentPage <= 5) {
        Static.Begin -= 1
        Static.End -= 1
    } else if (Static.Begin >= 4 && Static.currentPage == Static.Begin + 2) {
        Static.Begin -= 1
        Static.End -= 1
    } else if (Static.Begin >= 4 && Static.currentPage == Static.Begin + 1) {
        Static.Begin -= 2
        Static.End -= 2
    }

    if (Static.currentPage >= Static.lastPage - 3) {
        Ref.two_last.classList.add('hidden')
    } else if (Static.currentPage <= Static.lastPage - 2) {
        Ref.two_last.classList.remove('hidden')
    }

    return
}

front.loader = () => {
    Static.records = []
    Static.seach = ""
    Static.currentPage = 1

    Static.outertDigitsNumber = 2
    Static.Begin = 0
    Static.End = 5

    Func.makeRequest()
    return
}

front.display = () => {
    return (
        <main class="">
            <div class="wrapper">
                <Navigation />
            </div>
        </main>
    )
}

export { front }