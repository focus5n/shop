import React, {
    FC,
    createContext,
    useContext,
    useState,
    useEffect,
    SetStateAction,
    Dispatch,
} from 'react';

type Props = {
    children: React.ReactNode
}

const HSplashScreenContext = createContext<Dispatch<SetStateAction<number>> | undefined>(
    undefined
)

const HSplashScreenProvider: FC<Props> = ({ children }) => {
    const [count, setCount] = useState(0)
    let visible = count > 0

    useEffect(() => {
        const splashScreen = document.getElementById('splash-screen')

        if (splashScreen && visible) {
            splashScreen.classList.remove('hidden')
            splashScreen.style.setProperty('display', 'none')
            return () => {
                splashScreen.classList.add('hidden');
            }
        }

        let timeout: number
        if (splashScreen && !visible) {
            timeout = window.setTimeout(() => {
                splashScreen.classList.add('hidden')

            }, 3000)
        }

        return () => {
            clearTimeout(timeout)
        }
    }, [visible])

    return (
        <HSplashScreenContext.Provider value={setCount}>
            {children}
        </HSplashScreenContext.Provider>
    )
}

const LayoutSplashScreen: FC<{ visible?: boolean }> = ({ visible = true }) => {
    const setCount = useContext(HSplashScreenContext)

    useEffect(() => {
        if (!visible) {
            return
        }

        if (setCount) {
            setCount((prev) => {
                return prev + 1
            })
        }

        return () => {
            if (setCount) {
                setCount((prev) => {
                    return prev - 1
                })
            }
        }
    }, [setCount, visible])

    return null
}

export { HSplashScreenProvider, LayoutSplashScreen }
