import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface VideoPlayerProps {
  width?: number | string;
  height?: number | string;
}

export default class VideoPlayer extends React.Component<VideoPlayerProps> {
  player: any;
  videoNode!: HTMLVideoElement | null;

  componentDidMount() {
    this.initPlayer();
  }

  componentDidUpdate(prevProps: VideoPlayerProps) {
    // Re-initialize player if width or height changes
    if (prevProps.width !== this.props.width || prevProps.height !== this.props.height) {
      this.updatePlayer();
    }
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  initPlayer() {
    if (this.videoNode) {
      this.player = videojs(this.videoNode, {
        controls: true,
        // responsive: true,
        fluid: true, // Allows auto-resizing
        width: this.props.width || 640,
        height: this.props.height || 360,
        sources: [
          {
            src: '/src/public/video.mp4',
            type: 'video/mp4',
          },
        ],
      });
    }
  }

  updatePlayer() {
    if (this.player) {
      this.player.width(this.props.width || 640);
      this.player.height(this.props.height || 360);
      this.player.resize();
    }
  }

  render() {
    return (
      <div data-vjs-player>
        <video ref={(node) => (this.videoNode = node)} className="video-js"></video>
      </div>
    );
  }
}
