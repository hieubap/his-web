import React, { useState } from 'react';
import T from 'prop-types';
import { Button } from 'antd';
import { Main, MainScreen } from './styled';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const WebcamModal = (props) => {
    const { avatar, modalActions, type, title, open } = props;
    const [state, _setState] = useState({
        urlPreview: '',
        imageSrc: '',
        fileUpload: '',
        fileName: '',
    });
    const setState = (_state) => {
        _setState((state) => ({
            ...state,
            ...(_state || {}),
        }));
    };
    const dataURLtoFile = (dataurl, filename) => {
        if (dataurl) {
            var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        }
    };
    const selectImage = (e, isCapture) => {
        let file = '';
        let fileUpload = '';
        let urlPreview = '';
        let fileName = '';
        const base64regex = /^data:image\/(?:gif|png|jpeg|bmp|webp)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/g;
        const isbase64 = base64regex.test(e);
        if (isbase64) {
            let dataUri = e || e.onTakePhoto.dataUri;
            const imageSrc = dataUri;

            file = dataURLtoFile(imageSrc, 'image.jpg');
            urlPreview = imageSrc;
            fileUpload = file;
            fileName = '';
        }
        setState({
            urlPreview: urlPreview,
            imageSrc: file,
            fileUpload: fileUpload,
            fileName: fileName
        });
    };

    const uploadImage = () => {
        let fileName = null;
        if (state.imageSrc) fileName = state.imageSrc;
        fileName = state.fileUpload;
        modalActions(fileName);
    };
    const reTakePhoto = () => {
        setState({
            urlPreview: '',
            imageSrc: '',
            fileUpload: '',
            fileName: ''
        })
    };
    const srcAvatar = (avatar && avatar.absoluteUrl());
    const handleCancel = () => {
        navigator.getUserMedia({ audio: false, video: true },
            function (stream) {
                var track = stream.getTracks()[0];
                track.stop();
            },
            function (error) {
                console.log('getUserMedia() error', error);
            });
        props.history.goBack();
    }
    return (
        <Main
            className="mokup capture-popup"
            footer={[
                <div className="text-right">
                    <div className="action-capture">
                        <div className="row">
                            <div className="col-md-4 text-left">
                            </div>
                            <div className="col-md-4 text-center">
                                <Button
                                    className={'take-photo service-input active-element'}
                                    onClick={() => {
                                        const photo = document.getElementById('outer-circle');
                                        photo.click();
                                    }}>
                                    <i className="fal fa-camera-alt"></i>
                                </Button>
                            </div>
                            <div className="col-md-4 text-right">
                                <Button className="btn-save text-uppercase" onClick={reTakePhoto}>Chụp lại</Button>
                                <Button
                                    className="btn-print text-uppercase"
                                    onClick={() => {
                                        uploadImage();
                                    }} >Lưu lại</Button>
                            </div>
                        </div>
                    </div>
                </div>
            ]}
            width={'75%'}
            onCancel={handleCancel}
            visible={open}
        >
            <div className="webcam-inner">
                <h4 className="text-uppercase title-popup">{title}</h4>
                <MainScreen className="video-screen">
                    <Camera
                        onTakePhoto={dataUri => {
                            selectImage(dataUri, true);
                        }}
                        isImageMirror={type !== 'scanId'}
                    />
                    {state.urlPreview || srcAvatar ? (
                        <span className="image-preview" style={{ backgroundImage: `url(${state.urlPreview || srcAvatar})` }} ></span>
                    ) : null}
                </MainScreen>
            </div>
        </Main>
    );
};
WebcamModal.defaultProps = {
    data: {},
};
WebcamModal.propTypes = {
    errors: T.object,
    data: T.object,
};
export default WebcamModal;
