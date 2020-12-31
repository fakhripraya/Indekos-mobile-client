import React from 'react';
import { throttle } from 'lodash'; // 4.0.8

const withPreventDoubleClick = (WrappedComponent) => {

    class PreventDoubleClick extends React.PureComponent {

        throttledOnPress = () => {
            this.props.onPress && this.props.onPress();
        }

        onPress = throttle(this.throttledOnPress, 500, { leading: true, trailing: false });

        render() {
            return <WrappedComponent {...this.props} onPress={this.onPress} />;
        }
    }

    PreventDoubleClick.displayName = `withPreventDoubleClick(${WrappedComponent.displayName || WrappedComponent.name})`
    return PreventDoubleClick;
}

export default withPreventDoubleClick;