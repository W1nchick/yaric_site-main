'use client'
import React, { useEffect, useState } from "react"
import { getLevelbyId } from "./actions"
import { useRouter } from "next/navigation"
import './test.css'
import Link from "next/link"
export default function ClientComponent () {
    const router = useRouter()
    const [level, setlevel] = useState(1)
    const [mistake, setmistake] = useState(0)
    const [mistakes, setmistakes] = useState([0])
    const [text, settext] = useState('Загрзука...')
    const [but, setbut] = useState(['Загрзука...','Загрзука...','Загрзука...'])
    const [good, setgood] = useState(-1)
    const [isclick, setisclick] = useState(true)
    useEffect(() => {
        async function fetchData() {
            const result = await getLevelbyId(window.location.href.split('/')[3]+`${level}`)
            if (result==undefined) {
                if (level==1) {router.push('/')}
                else {
                    const res = document.getElementById('result-box')
                    res?.setAttribute('style', 'display: flex')
                    settext('-')
                    setbut(['-','-','-'])
                    setgood(-1)
                }
            }
            else {
                const new_mistakes = [...mistakes]
                if (new_mistakes[0]==0) {new_mistakes.pop()}
                console.log(new_mistakes)
                setmistakes(new_mistakes)
                settext(result.text)
                setbut(result.answers)
                setgood(result.good)
                const el = document.getElementById("question-zone")
                if (window.innerWidth < 500) {el!.setAttribute('style', `background-image: url(${result.img[2]})`)}
                else if (window.innerWidth < 1100) {el!.setAttribute('style', `background-image: url(${result.img[1]})`)}
                else {el!.setAttribute('style', `background-image: url(${result.img[0]})`)}
                addEventListener('resize', () => {
                    const el = document.getElementById("question-zone")
                    if (window.innerWidth < 500) {el!.setAttribute('style', `background-image: url(${result.img[2]})`)}
                    else if (window.innerWidth < 1100) {el!.setAttribute('style', `background-image: url(${result.img[1]})`)}
                    else {el!.setAttribute('style', `background-image: url(${result.img[0]})`)}
                })
                const b1 = document.getElementById("1")
                const b2 = document.getElementById("2")
                const b3= document.getElementById("3")
                b1?.setAttribute('style', 'background-color:none')
                b2?.setAttribute('style', 'background-color:none')
                b3?.setAttribute('style', 'background-color:none')
                setisclick(false)
            }
            
        };
        fetchData();
    }, [level])
    const butclick = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (isclick==false) {
            setisclick(true)
            if (e.currentTarget.id==`${good}`) {
                e.currentTarget.setAttribute('style', 'background-color: green')
                setTimeout(async()=>{setlevel(level+1)},500)
            } else {
                e.currentTarget.setAttribute('style', 'background-color: red')
                setTimeout(async()=>{
                    setmistake(mistake+1);
                    const new_mistake = [...mistakes]
                    new_mistake.push(level)
                    setmistakes(new_mistake)
                    setlevel(level+1)},500)
            }
        }
    }
    const check = ()=>{
        const a = []
        for (let i=1;i<level;i++) {
            let t = false
            mistakes.forEach(el=>{
                if (i==el) {t=true;a.push(<p className="t red">{i}: Неверно</p>)}
            })
            if (!t) {a.push(<p className="t green">{i}: Верно</p>)}
        }
        return a
    }
    return(
        <div id="main-3">
            <div id="result-box">
                <p className="text-zxc">Верно: {(level-1)-mistake}</p>
                <p className="text-zxc">Неверно: {mistake}</p>
                <p className="text-zxc">Успешные ответы: {Math.round(((level-1)-mistake)/(level-1)*100)}%</p>
                <div id='text-box-2'>
                    {check()}
                </div>
                <Link id='back' href={'/'} className="text-zxc">На главную</Link>
            </div>
            <div id='blur' />
            <div id="question-zone">
                <div id='text-box'><p id='t-b'/><p id='t2'>{text}</p></div>
            </div>
            <div id="answer-zone">
                <button onClick={async(event)=>{await butclick(event)}} id='1' className="but">{but[0]}</button>
                <button onClick={async(event)=>{await butclick(event)}} id='2' className="but">{but[1]}</button>
                <button onClick={async(event)=>{await butclick(event)}} id='3' className="but">{but[2]}</button>
            </div>
        </div>

    )
}