import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, Button, View } from 'react-native';
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals
} from 'react-native-webrtc';

export default function Chats() {

    const openCamera = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
            try {
                return await mediaDevices.getUserMedia({
                    audio: true,
                    video: false
                })
            } catch (err) {
                console.log(err);
            }
        } else {
            let isFront = true;
            await mediaDevices.enumerateDevices().then(sourceInfos => {
                console.log(sourceInfos);
                let videoSourceId;
                for (let i = 0; i < sourceInfos.length; i++) {
                    const sourceInfo = sourceInfos[i];
                    if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
                        videoSourceId = sourceInfo.deviceId;
                    }
                }

                try {
                    await mediaDevices.getUserMedia({
                        audio: true,
                        video: {
                            width: 640,
                            height: 480,
                            frameRate: 30,
                            facingMode: (isFront ? "user" : "environment"),
                            deviceId: videoSourceId
                        }
                    })
                } catch (err) {
                    console.log(err);
                }

            });
        }
    };

    useEffect(() => {
        openCamera()
            .then((stream) => {
                // userVideo.current.srcObject = stream;
                // userStream.current = stream;

                // webSocketRef.current = new WebSocket(
                //     `ws://localhost:8000/join?roomID=${props.match.params.roomID}`
                // );

                // webSocketRef.current.addEventListener("open", () => {
                //     webSocketRef.current.send(JSON.stringify({ join: true }));
                // });

                // webSocketRef.current.addEventListener("message", async (e) => {
                //     const message = JSON.parse(e.data);

                //     if (message.join) {
                //         callUser();
                //     }

                // 	if (message.offer) {
                //         handleOffer(message.offer);
                //     }

                //     if (message.answer) {
                //         console.log("Receiving Answer");
                //         peerRef.current.setRemoteDescription(
                //             new RTCSessionDescription(message.answer)
                //         );
                //     }

                //     if (message.iceCandidate) {
                //         console.log("Receiving and Adding ICE Candidate");
                //         try {
                //             await peerRef.current.addIceCandidate(
                //                 message.iceCandidate
                //             );
                //         } catch (err) {
                //             console.log("Error Receiving ICE Candidate", err);
                //         }
                //     }
                // });
            })
            .catch((error) => {
                console.log(error);
            });
    });

    return (
        <View>
            <Button title="Chats" />
        </View>
    )
}

const styles = StyleSheet.create({})
