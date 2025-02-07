import { useEffect, useRef, useState, useCallback } from 'react';
import { Video, VideoOff, Mic, MicOff, PhoneOff } from 'lucide-react';

interface VideoCallProps {
  roomId: string;
  onClose: () => void;
}

export function VideoCall({ roomId, onClose }: VideoCallProps) {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const initializeMediaStream = useCallback(async () => {
    try {
      if (!navigator.mediaDevices) {
        throw new Error('Media devices not supported');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localStreamRef.current = stream;

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing media devices:', err);
    }
  }, []);

  const handleVideoToggle = useCallback(() => {
    setIsVideoEnabled((prev) => !prev);
    if (localStreamRef.current) {
      localStreamRef.current
        .getVideoTracks()
        .forEach((track) => (track.enabled = !isVideoEnabled));
    }
  }, [isVideoEnabled]);

  const handleAudioToggle = useCallback(() => {
    setIsAudioEnabled((prev) => !prev);
    if (localStreamRef.current) {
      localStreamRef.current
        .getAudioTracks()
        .forEach((track) => (track.enabled = !isAudioEnabled));
    }
  }, [isAudioEnabled]);

  const cleanupMediaStream = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }
  }, []);

  useEffect(() => {
    initializeMediaStream();
    return cleanupMediaStream;
  }, [roomId, initializeMediaStream, cleanupMediaStream]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl p-4">
        <div className="relative aspect-video mb-4">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full rounded-lg bg-gray-900"
          />
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="absolute bottom-4 right-4 w-48 rounded-lg bg-gray-900"
          />
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleVideoToggle}
            className={`p-4 rounded-full ${
              isVideoEnabled
                ? 'bg-gray-200 text-gray-800'
                : 'bg-red-500 text-white'
            }`}
          >
            {isVideoEnabled ? (
              <Video className="w-6 h-6" />
            ) : (
              <VideoOff className="w-6 h-6" />
            )}
          </button>
          <button
            onClick={handleAudioToggle}
            className={`p-4 rounded-full ${
              isAudioEnabled
                ? 'bg-gray-200 text-gray-800'
                : 'bg-red-500 text-white'
            }`}
          >
            {isAudioEnabled ? (
              <Mic className="w-6 h-6" />
            ) : (
              <MicOff className="w-6 h-6" />
            )}
          </button>
          <button
            onClick={onClose}
            className="p-4 rounded-full bg-red-500 text-white"
          >
            <PhoneOff className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
