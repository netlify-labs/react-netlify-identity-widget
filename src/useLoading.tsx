import React from "react"

export default function useLoading() {
  const [isLoading, setState] = React.useState(false)
  function load<A>(aPromise: Promise<A>) {
    setState(true)
    return aPromise
      .then((...args) => {
        setState(false)
        return Promise.resolve(...args)
      })
      .catch((...args) => {
        setState(false)
        return Promise.reject(...args)
      })
  }
  return [isLoading, load] as [boolean, <A>(aPromise: Promise<A>) => Promise<A>]
}
