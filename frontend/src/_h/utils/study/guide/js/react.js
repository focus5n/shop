// wrong
this.setState({
    counter: this.StaticRange.counter + this.PaymentResponse.increment
})

// good
this.setState((state, props) => ({
    counter: state.counter + props.counter
}))
// setState함수는 비동기적