import {h, Component} from 'preact';

export default class HeartSVG extends Component {
  render() {
    return (
      <svg className="svg-heart" viewBox="-5 0 110 125">
        <desc>heart</desc>
        <path
          d="M49.99,96.266c4.246-2.908,50.016-34.809,50.016-63.154c0-17.711-10.822-29.378-26.424-29.378  c-14.357,0-22.389,13.18-23.582,15.29c-1.194-2.109-9.225-15.29-23.582-15.29c-15.603,0-26.425,11.667-26.425,29.378  c0,28.345,45.724,60.246,49.97,63.154H49.99z"
          fill="transparent"
          stroke="var(--red)"
          stroke-width="10"
        />
      </svg>
    );
  }
}
