import {createRoot, Root} from 'react-dom/client'
import Cross from 'resources/img/cross.svg'
import './styles.css'

interface Holder {
  alertContainer: HTMLDivElement
  root: Root
  removed: boolean
}

type Variant = 'alert-danger' | 'alert-success'

interface Props {
  message: string
  variant: Variant
  holder: Holder
}

const removeAlert = (holder: Holder) => {
  holder.root.unmount()
  document.body?.removeChild(holder.alertContainer)
  holder.removed = true
}

const mountAlert = (message: string, variant: Variant): Holder => {
  const alertContainer = document.createElement('div')
  const root = createRoot(alertContainer)
  const holder: Holder = {
    alertContainer,
    root,
    removed: false,
  }
  root.render(<Alert message={message} variant={variant} holder={holder} />)
  document.body?.appendChild(alertContainer)
  return holder
}

const Alert = ({message, variant, holder}: Props) => (
  <div className={variant} onClick={() => removeAlert(holder)}>
    <img
      className={'cross'}
      src={Cross}
      alt="cross"
      width={20}
      height={20}
    />
    {message}
  </div>
)

export default function alert(
  message: string,
  variant: 'alert-danger' | 'alert-success' = 'alert-danger',
) {
  const holder = mountAlert(message, variant)
  setTimeout(() => {
    if (!holder.removed) removeAlert(holder)
  }, 8000)
}
