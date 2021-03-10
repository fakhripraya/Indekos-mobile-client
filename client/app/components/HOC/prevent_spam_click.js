import React from 'react';
import { throttle } from 'lodash'; // 4.0.8

const withDelay = (WrappedComponent) => {

    class PreventDoubleClick extends React.PureComponent {

        throttledOnPress = () => {
            this.props.onPress && this.props.onPress();
        }

        onPress = throttle(this.throttledOnPress, 2500, { leading: true, trailing: false });

        render() {
            return <WrappedComponent {...this.props} onPress={this.onPress} />;
        }
    }

    PreventDoubleClick.displayName = `withDelay(${WrappedComponent.displayName || WrappedComponent.name})`
    return PreventDoubleClick;
}

export default withDelay;