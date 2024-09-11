import { useCallback, useEffect } from 'react'
import './styles.css'
import { Body, BottomSpark, Handle, MiddleSpark, moveHandle, showSparks, TopSpark } from './parts'



const LockIcon = ({lockState, setLockState}: {lockState: number, setLockState: any}) => {

    const show = useCallback(() => {
        showSparks()
        moveHandle()
    }, [])
    const shake = useCallback(() => {
        const container = document.querySelector('.lock-container')
        container?.classList.add('shake')
        setTimeout(() => {
            setLockState(0)
            container?.classList.remove('shake')
        }, 300)
    }, [])
    useEffect(() => {
        if (lockState === 1) {
            show()
        }
        if (lockState === 2) {
            shake()
        }
    }, [lockState])

    return (
        <div className="lock-container">
            <Handle className="lock-handle"/>
            <Body className="lock-body"/>
            <TopSpark/>
            <MiddleSpark/>
            <BottomSpark/>
        </div>
    )
}

export default LockIcon