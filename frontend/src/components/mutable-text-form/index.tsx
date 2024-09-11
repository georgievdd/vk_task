import './styles.css'
import { debounce, generateId, useRef } from "helpers"
import { FC, useCallback, useEffect, useState } from "react"

interface Props {
  initText: string
  onChange: (text: string) => void
}

const MutableTextForm: FC<Props> = ({
    initText,
    onChange,
}) => {
  const formId = generateId('form')
  const listener = useCallback(debounce((e: any) => {
    const text = e.target.innerHTML
    onChange(text)
  }, 700), [])
  useEffect(() => {
    const form = document.querySelector(`#${formId}`)
    if (form) {
      form.addEventListener('input', listener)
      return () => form.removeEventListener('input', listener)
    }
  }, [])
  return (
    <div
      id={formId}
      className='mtf-container'
      contentEditable
    >{initText}</div>
  )
}

export default MutableTextForm