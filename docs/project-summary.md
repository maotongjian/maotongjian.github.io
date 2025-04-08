## 项目贡献 git shortlog -sn

![图片](/git-shortlog.png 'shortlog')

## vue2 项目代码风格 demo

```js

<template>
  <div v-if="renderAITry" class="ai-try-container">
    <div class="ai-try">
      <div class="ai-try-on" @click="() => toggleAITryDialogStatus(true)">
        <i class="iconfont close" @click="handleDestroy">&#xe631;</i>
        <span class="text">{{ $t('AI Try On') }}</span>
        <i class="iconfont clothing">&#xe7cc;</i>
      </div>
    </div>
    <BDialog
      v-model="showAITry"
      getContainer="body"
      class="try-dialog-container"
      @closed="handleAfterClose"
    >
      <template #title>
        <span class="adineuePRO">{{ $t('AI Try On') }}</span>
      </template>
      <div class="try-main">
        <p v-if="uploadStep !== 3 && !generateLoading" class="upload-tip">
          {{ $t('Upload an upper body photo') }}
        </p>
        <template v-if="uploadStep === 1">
          <div class="image-true">
            <GImg
              class="try_1"
              src="~/assets/images/AI-Try/ai_try_1.png"
              width="260"
              height="387"
              :alt="$t('Correct Example Image')"
            />
          </div>
          <div class="wrong-title">
            <span class="title">{{ $t('Wrong Example') }}</span>
          </div>
          <div class="image-false">
            <div
              v-for="(item, index) in wrongImages"
              :key="index"
              class="image-container"
            >
              <GImg
                class="try-false"
                :src="item.src"
                :width="item.width"
                :height="item.height"
                :alt="item.alt"
              />
              <span class="title">{{ item.title }}</span>
            </div>
          </div>
          <BButton
            class="upload-btn"
            btnSize="large"
            btnType="commonBlack"
            @click="handleUploadPhoto"
          >
            <span class="text">{{ $t('Upload Photo') }}</span>
          </BButton>
        </template>
        <template v-if="uploadStep === 2">
          <a-spin v-if="fileLoading">
            <a-icon
              slot="indicator"
              type="loading"
              style="font-size: 40px;"
              spin
            />
          </a-spin>
          <a-upload-dragger
            v-if="!fileLoading && uploadImage.src === ''"
            name="file"
            accept=".jpg,.jpeg,.png"
            :maxCount="1"
            :multiple="false"
            :showUploadList="false"
            class="dragger-container"
            :beforeUpload="handleBeforeUpload"
          >
            <template v-if="uploadImage.src === ''">
              <p class="ant-upload-drag-icon image-icon-container">
                <i class="iconfont">&#xe65c;</i>
              </p>
              <p class="ant-upload-text">
                {{ $t('Click or drag to upload photo') }}
              </p>
              <p class="ant-upload-hint">{{ $t('Supports jpg') }}</p>
            </template>
          </a-upload-dragger>
          <template v-if="!fileLoading && uploadImage.src !== ''">
            <div
              :class="['image-container', { 'image-loading': generateLoading }]"
            >
              <GImg class="upload-image" :src="uploadImage.src" />
            </div>
            <p v-if="generateLoading" class="loading-tip">
              {{ $t('Loading') }}
              <svg
                height="1em"
                viewBox="0 0 100 40"
                style="vertical-align: -0.125em;"
              >
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g transform="translate(-100.000000, -71.000000)">
                    <g transform="translate(95.000000, 71.000000)">
                      <g transform="translate(5.000000, 0.000000)">
                        <rect
                          fill="currentColor"
                          x="20"
                          y="16"
                          width="8"
                          height="8"
                          rx="2"
                        >
                          <animate
                            attributeName="y"
                            from="16"
                            to="16"
                            dur="2s"
                            begin="0s"
                            repeatCount="indefinite"
                            values="16; 6; 26; 16; 16"
                            keyTimes="0; 0.1; 0.3; 0.4; 1"
                          ></animate>
                        </rect>
                        <rect
                          fill="currentColor"
                          x="46"
                          y="16"
                          width="8"
                          height="8"
                          rx="2"
                        >
                          <animate
                            attributeName="y"
                            from="16"
                            to="16"
                            dur="2s"
                            begin="0.2s"
                            repeatCount="indefinite"
                            values="16; 6; 26; 16; 16"
                            keyTimes="0; 0.1; 0.3; 0.4; 1"
                          ></animate>
                        </rect>
                        <rect
                          fill="currentColor"
                          x="72"
                          y="16"
                          width="8"
                          height="8"
                          rx="2"
                        >
                          <animate
                            attributeName="y"
                            from="16"
                            to="16"
                            dur="2s"
                            begin="0.4s"
                            repeatCount="indefinite"
                            values="16; 6; 26; 16; 16"
                            keyTimes="0; 0.1; 0.3; 0.4; 1"
                          ></animate>
                        </rect>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </p>
            <div v-if="!generateLoading" class="operation">
              <a-upload
                name="file"
                accept=".jpg,.jpeg,.png"
                :maxCount="1"
                :multiple="false"
                :showUploadList="false"
                :beforeUpload="handleBeforeUpload"
                class="reupload"
              >
                <BButton btnType="commonBlack" btnSize="large">
                  {{ $t('Reupload') }}
                </BButton>
              </a-upload>
              <BButton
                btnType="commonBlack"
                btnSize="large"
                @click="handleGenerate"
              >
                {{ $t('Generate') }}
              </BButton>
            </div>
          </template>
        </template>
        <template v-if="uploadStep === 3">
          <div class="generate-content">
            <GImg
              v-if="generateImageSrc"
              class="upload-image generate-image"
              :src="generateImageSrc"
            />
            <p class="product-title">{{ productInfo.title }}</p>
            <p class="product-price">
              {{
                productInfo.is_seckill
                  ? $currency(productInfo.seckill.price)
                  : $currency(productInfo.price)
              }}
            </p>
            <BButton
              class="shopping-now"
              btnType="commonBlack"
              btnSize="large"
              @click="handleClickAITryShoppingNow"
            >
              {{ $t('Shopping Now') }}
            </BButton>
          </div>
        </template>
      </div>
    </BDialog>
  </div>
</template>

<script>
import gtmCode from '~basic/utils/gaGTMCode.js';
import { getAIImageApi } from '~basic/api/aitry.js';
import BDialog from '~/components/Base/BDialog';
import BButton from '~/components/Base/BButton';

export default {
  components: { BDialog, BButton },
  props: {
    productInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      renderAITry: true,
      showAITry: false,
      uploadStep: 1,
      fileLoading: false,
      uploadImage: { file: {}, src: '' },
      generateLoading: false,
      generateImageSrc: '',
      wrongImages: [
        {
          src: '~/assets/images/AI-Try/ai_try_2.png',
          width: 240,
          height: 355,
          alt: this.$t('Error Example Image {number}'),
          title: this.$t('Back photo'),
        },
        {
          src: '~/assets/images/AI-Try/ai_try_3.png',
          width: 240,
          height: 355,
          alt: this.$t('Error Example Image {number}'),
          title: this.$t('Side view photo'),
        },
        {
          src: '~/assets/images/AI-Try/ai_try_4.png',
          width: 240,
          height: 355,
          alt: this.$t('Error Example Image {number}'),
          title: this.$t('Group photo'),
        },
      ],
    };
  },
  methods: {
    handleDestroy(e) {
      e.stopPropagation();
      this.renderAITry = false;
    },
    handleUploadPhoto() {
      this.uploadStep = 2;
    },
    toggleAITryDialogStatus(bool) {
      this.showAITry = bool;
    },
    handleAfterClose() {
      this.fileLoading = false;
      if (!this.generateLoading) {
        this.uploadStep = 1;
        this.uploadImage = { file: {}, src: '' };
      }
    },
    validateFileFormat(file) {
      const acceptType = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
      if (!acceptType.includes(file.type)) {
        this.$showToast.fail(this.$t('Support JPG 、JPEG 、GIF、 PNG'));
        return false;
      }
      return true;
    },
    validateFileSize(file) {
      const limitSize = 1024 * 1024 * 10;
      if (file.size > limitSize) {
        this.$showToast.fail(this.$t('Image must smaller than 10MB!'));
        return false;
      }
      return true;
    },
    readFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error(reader.error));
      });
    },
    async handleBeforeUpload(info) {
      this.fileLoading = true;
      const file = info.file || info;
      if (!this.validateFileFormat(file) || !this.validateFileSize(file)) {
        this.fileLoading = false;
        return;
      }
      try {
        const fileRes = await this.readFile(file);
        this.uploadImage = { file: file, src: fileRes };
      } catch (error) {
        console.error('Failed to read file', error);
        this.$showToast.fail(
          this.$t('Failed to read the file, Please try again.'),
        );
      } finally {
        this.fileLoading = false;
      }
    },
    async handleGenerate() {
      gtmCode.clickGenerate();
      try {
        this.generateLoading = true;
        const formData = new FormData();
        formData.append('id', this.productInfo.product_id);
        formData.append('file', this.uploadImage.file);
        const res = await getAIImageApi(window.$nuxt, formData);
        if (~~res.code === 200) {
          const generateImageSrc = res.data;
          this.generateImageSrc = generateImageSrc;
          this.uploadStep = 3;
        } else {
          this.$showToast.fail(this.$t('Generation failed, please try again'));
        }
      } catch (error) {
        console.error('AI Try error', error);
        this.$showToast.fail(this.$t('Generation failed, please try again'));
      } finally {
        this.generateLoading = false;
      }
    },
    handleClickAITryShoppingNow() {
      gtmCode.clickAITryShoppingNow();
      this.toggleAITryDialogStatus(false);
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: $max-width) {
  .ai-try {
    .ai-try-on {
      position: absolute;
      right: 0;
      bottom: 40px;
      z-index: 999;
      padding: 8px 16px;
      background-color: rgb(0, 182, 122);
      font-size: 14px;
      vertical-align: middle;
      color: #fff;
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-evenly;
      align-items: center;
      gap: 8px;
      border-top-left-radius: 24px;
      border-bottom-left-radius: 24px;
      .close {
        font-size: 16px;
      }
      .text {
        padding-top: 2px;
      }
      .clothing {
        font-size: 22px;
      }
    }
  }
  .try-dialog-container {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 0;
    color: #000;
    &::v-deep header.dialog-header {
      margin-bottom: 0 !important;
      padding: 24px 16px;
      border-bottom: solid 1px #ccc;
    }
    & > main {
      .try-main {
        padding: 12px 16px 32px 16px;
        .upload-tip {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 16px;
        }
        .image-true {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 48px;
          .try_1 {
            width: 50%;
            height: auto;
          }
        }
        .wrong-title {
          position: relative;
          width: 90%;
          margin: 0 auto;
          border-bottom: solid 1px #000;
          margin-bottom: 32px;
          .title {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            padding: 0 32px;
            white-space: nowrap;
          }
        }
        .image-false {
          display: flex;
          justify-content: space-evenly;
          width: 100%;
          gap: 12px;
          margin-bottom: 32px;
          .image-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            gap: 6px;
            .try-false {
              width: 100%;
              height: auto;
            }
          }
        }
        .upload-btn {
          width: 100%;
          .text {
            font-size: 20px;
            font-weight: bold;
          }
        }
        .dragger-container {
          display: block;
          &::v-deep {
            .ant-upload {
              min-height: 400px;
            }
            .ant-upload-drag-container {
              display: flex !important;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 100%;
            }
          }
          .image-icon-container {
            & > i {
              font-size: 48px;
            }
          }
        }
        .image-container {
          position: relative;
          margin-bottom: 24px;
          overflow: hidden;
          &.image-loading::after {
            content: '';
            position: absolute;
            top: -30%;
            left: 0;
            width: 100%;
            height: 30%;
            background: linear-gradient(
              to bottom,
              transparent 0%,
              rgba(150, 225, 245, 0.8) 45%,
              rgba(150, 225, 245, 0.8) 100%,
              transparent 100%
            );
            filter: blur(10px);
            opacity: 0.8;
            animation: scanEffect 3s linear infinite;
            @keyframes scanEffect {
              0% {
                top: -30%;
              }
              50% {
                top: 50%;
              }
              100% {
                top: 130%;
              }
            }
          }
        }
        .upload-image {
          width: 100%;
          height: auto;
        }
        .loading-tip {
          font-size: 16px;
          font-weight: bold;
          text-align: center;
        }
        .operation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          .reupload {
            width: 50%;
            flex-shrink: 0;
            &::v-deep {
              .ant-upload-select {
                width: 100%;
              }
              .ant-upload {
                display: block;
                width: 100%;
                & > button {
                  width: 100%;
                }
              }
            }
          }
          & > button {
            width: 50%;
            font-size: 20px;
            font-weight: bold;
          }
        }
        .generate-content {
          .generate-image {
            margin-bottom: 16px;
          }
          .product-title {
            margin-bottom: 12px;
          }
          .product-price {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 16px;
          }
          .shopping-now {
            width: 100%;
          }
        }
      }
    }
  }
}
@media screen and (min-width: $min-width) {
  .ai-try {
    .ai-try-on {
      position: fixed;
      left: 0;
      bottom: 40px; /* no */
      z-index: 999;
      padding: 8px 24px; /* no */
      background-color: rgb(0, 182, 122);
      font-size: 18px; /* no */
      color: #fff;
      user-select: none;
      cursor: pointer;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      gap: 16px; /* no */
      border-top-right-radius: 24px; /* no */
      border-bottom-right-radius: 24px; /* no */
      .close {
        font-size: 20px; /* no */
      }
      .clothing {
        font-size: 28px; /* no */
      }
    }
  }

  .try-dialog-container {
    padding: 0;
    color: #000;
    &::v-deep header.dialog-header {
      margin-bottom: 0 !important;
      padding: 24px 16px; /* no */
    }
    & > main {
      .try-main {
        min-width: 40vw;
        padding: 12px 16px 32px 16px; /* no */
        .upload-tip {
          font-size: 16px; /* no */
          font-weight: bold;
          margin-bottom: 16px; /* no */
        }
        .image-true {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 48px; /* no */
          .try_1 {
            height: 30vh;
            width: auto;
          }
        }
        .wrong-title {
          position: relative;
          width: 90%;
          margin: 0 auto;
          border-bottom: solid 1px #000; /* no */
          margin-bottom: 32px; /* no */
          .title {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            padding: 0 32px; /* no */
            white-space: nowrap;
          }
        }
        .image-false {
          display: flex;
          justify-content: space-evenly;
          width: 100%;
          gap: 12px; /* no */
          margin-bottom: 32px; /* no */
          .image-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            gap: 6px; /* no */
            .try-false {
              height: 20vh;
              width: auto;
            }
          }
        }
        .upload-btn {
          width: 100%;
          .text {
            font-size: 20px; /* no */
            font-weight: bold;
          }
        }
        .dragger-container {
          display: block;
          margin-bottom: 20px; /* no */
          &::v-deep {
            .ant-upload {
              min-height: 500px; /* no */
              &:hover {
                border-color: #4096ff;
              }
            }
            .ant-upload-drag-container {
              display: flex !important;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 100%;
            }
          }
          .image-icon-container {
            & > i {
              font-size: 48px; /* no */
            }
          }
        }
        .image-container {
          position: relative;
          overflow: hidden;
          width: fit-content;
          margin: 0 auto;
          margin-bottom: 24px; /* no */
          &.image-loading::after {
            content: '';
            position: absolute;
            top: -30%;
            left: 0;
            width: 100%;
            height: 30%;
            background: linear-gradient(
              to bottom,
              transparent 0%,
              rgba(150, 225, 245, 0.8) 45%,
              rgba(150, 225, 245, 0.8) 100%,
              transparent 100%
            );
            filter: blur(10px); /* no */
            opacity: 0.8;
            animation: scanEffect 3s linear infinite;
            @keyframes scanEffect {
              0% {
                top: -30%;
              }
              50% {
                top: 50%;
              }
              100% {
                top: 130%;
              }
            }
          }
        }
        .upload-image {
          height: 60vh;
          width: auto;
        }
        .loading-tip {
          font-size: 16px; /* no */
          font-weight: bold;
          text-align: center;
        }
        .operation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px; /* no */
          .reupload {
            width: 50%;
            flex-shrink: 0;
            &::v-deep {
              .ant-upload-select {
                width: 100%;
              }
              .ant-upload {
                display: block;
                width: 100%;
                & > button {
                  width: 100%;
                }
              }
            }
          }
          & > button {
            width: 50%;
          }
        }
        .generate-content {
          .generate-image {
            display: block;
            margin: 0 auto;
            margin-bottom: 16px; /* no */
          }
          .product-title {
            margin-bottom: 12px; /* no */
          }
          .product-price {
            font-size: 20px; /* no */
            font-weight: bold;
            margin-bottom: 16px; /* no */
          }
          .shopping-now {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>


```

## react 项目代码风格 demo

```js
import styles from './index.module.scss';
import classNames from 'classnames/bind';

import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { useState, memo } from 'react';
import { Upload } from 'antd';
import { SpinLoading, DotLoading } from 'antd-mobile';
import { useStore } from 'react-redux';

import useToast from '~hooks/useToast';
import useDynamicCurrency from '~hooks/useDynamicCurrency';

import gtmCode from '~utils/gaGTMCode';

import { getAIImageApi } from '~apis/aitry';

import BDialog from '~components/BDialog';
import GImg from '~components/GImg';
import BButton from '~components/Base/BButton';

const cn = classNames.bind(styles);
const { Dragger } = Upload;
const draggerProps = {
  name: 'file',
  accept: '.jpg,.jpeg,.png',
  maxCount: 1,
  multiple: false,
  showUploadList: false,
  className: cn('dragger-container'),
};

const AITry = ({ productInfo = {} }) => {
  const { t: $t } = useTranslation('productDetail');
  const showToast = useToast();
  const clientContext = { store: useStore() };
  const { $currency } = useDynamicCurrency();

  const [renderAITry, setRenderAITry] = useState(true);
  const [showAITry, setShowAITry] = useState(false);
  const [uploadStep, setUploadStep] = useState(1);
  const [fileLoading, setFileLoading] = useState(false);
  const [uploadImage, setUploadImage] = useState({ file: {}, src: '' });
  const [generateLoading, setGenerateLoading] = useState(false);
  const [generateImageSrc, setGenerateImageSrc] = useState('');

  const openAITry = () => {
    setShowAITry(true);
  };

  const handleDestroy = (e) => {
    e.stopPropagation();
    setRenderAITry(false);
  };

  const handleUploadPhoto = () => {
    setUploadStep(2);
  };

  const handleCloseAITryDialog = () => {
    setShowAITry(false);
  };

  const handleAfterClose = () => {
    setFileLoading(false);
    if (!generateLoading) {
      setUploadStep(1);
      setUploadImage({ file: {}, src: '' });
    }
  };

  const validateFileFormat = (file) => {
    const acceptType = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    if (!acceptType.includes(file.type)) {
      showToast.fail($t('Support JPG'));
      return false;
    }
    return true;
  };

  const validateFileSize = (file) => {
    const limitSize = 1024 * 1024 * 10;
    if (file.size > limitSize) {
      showToast.fail($t('Image must smaller than 10MB'));
      return false;
    }
    return true;
  };

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        return resolve(reader.result);
      };
    });
  };

  const handleCustomRequest = async (info) => {
    setFileLoading(true);
    const file = info.file || info;
    if (!validateFileFormat(file) || !validateFileSize(file)) return;
    const fileRes = await readFile(file);
    setUploadImage(() => ({ file: file, src: fileRes }));
    setFileLoading(false);
  };

  const handleGenerate = async () => {
    gtmCode.clickGenerate();
    try {
      setGenerateLoading(true);
      const formData = new FormData();
      formData.append('id', productInfo.product_id);
      formData.append('file', uploadImage.file);
      const res = await getAIImageApi(clientContext, formData);
      if (~~res.code === 200) {
        const generateImageSrc = res.data;
        setGenerateImageSrc(generateImageSrc);
        setUploadStep(3);
      } else {
        showToast.fail($t('Generation failed'));
      }
      setGenerateLoading(false);
    } catch (error) {
      console.log('AI Try error', error);
      setGenerateLoading(false);
      showToast.fail($t('Generation failed'));
    }
  };

  const handleClickAITryShoppingNow = () => {
    gtmCode.clickAITryShoppingNow();
    handleCloseAITryDialog();
  };

  const renderAITryDialog = () => (
    <>
      <BDialog
        visible={showAITry}
        onClose={handleCloseAITryDialog}
        changeCenterPopupMountNode
        title={$t('AI Try On')}
        titlePosition="center"
        bodyClassName={cn('try-dialog-container')}
        destroyOnClose
        onAfterClose={handleAfterClose}
        afterClose={handleAfterClose}
      >
        <div className={cn('try-main')}>
          {uploadStep !== 3 && !generateLoading && (
            <p className={cn('upload-tip')}>{$t('Upload an upper body photo')}</p>
          )}
          {uploadStep === 1 && (
            <>
              <div className={cn('image-true')}>
                <GImg
                  className={cn('try_1')}
                  src="/images/default/AI-Try/ai_try_1.png"
                  width={260}
                  height={387}
                  alt={$t('Correct Example Image')}
                />
              </div>
              <div className={cn('wrong-title')}>
                <span className={cn('title')}>{$t('Wrong Example')}</span>
              </div>
              <div className={cn('image-false')}>
                <div className={cn('image-container')}>
                  <GImg
                    className={cn('try-false')}
                    src="/images/default/AI-Try/ai_try_2.png"
                    width={240}
                    height={355}
                    alt={$t('Error Example Image 1')}
                  />
                  <span className={cn('title')}>{$t('Back photo')}</span>
                </div>
                <div className={cn('image-container')}>
                  <GImg
                    className={cn('try-false')}
                    src="/images/default/AI-Try/ai_try_3.png"
                    width={240}
                    height={354}
                    alt={$t('Error Example Image 2')}
                  />
                  <span className={cn('title')}>{$t('Side view photo')}</span>
                </div>
                <div className={cn('image-container')}>
                  <GImg
                    className={cn('try-false')}
                    src="/images/default/AI-Try/ai_try_4.png"
                    width={240}
                    height={356}
                    alt={$t('Error Example Image 3')}
                  />
                  <span className={cn('title')}>{$t('Group photo')}</span>
                </div>
              </div>
              <BButton
                className={cn('upload-btn')}
                text={$t('Upload Photo')}
                btnSize="large"
                onClick={handleUploadPhoto}
              />
            </>
          )}
          {uploadStep === 2 && (
            <>
              {fileLoading && <SpinLoading style={{ '--size': '40px' }} />}
              {!fileLoading && uploadImage.src === '' && (
                <Dragger {...draggerProps} customRequest={handleCustomRequest}>
                  {uploadImage.src === '' && (
                    <>
                      <p className={`ant-upload-drag-icon ${cn('image-icon-container')}`}>
                        <i className={`iconfont`}>&#xe62c;</i>
                      </p>
                      <p className="ant-upload-text">{$t('Click or drag to upload photo')}</p>
                      <p className="ant-upload-hint">{$t('Supports jpg')}</p>
                    </>
                  )}
                </Dragger>
              )}
              {!fileLoading && uploadImage.src !== '' && (
                <>
                  <div
                    className={cn('image-container', {
                      'image-loading': generateLoading,
                    })}
                  >
                    <GImg className={cn('upload-image')} src={uploadImage.src} />
                  </div>
                  {generateLoading && (
                    <p className={cn('loading-tip')}>
                      {`${$t('Loading')}`}
                      <DotLoading color="#000" />
                    </p>
                  )}
                  {!generateLoading && (
                    <div className={cn('operation')}>
                      <Upload
                        className={cn('reupload')}
                        beforeUpload={handleCustomRequest}
                        accept=".jpg,.jpeg,.png"
                        maxCount={1}
                      >
                        <BButton text={$t('Reupload')} btnSize="large" />
                      </Upload>
                      <BButton text={$t('Generate')} btnSize="large" onClick={handleGenerate} />
                    </div>
                  )}
                </>
              )}
            </>
          )}
          {uploadStep === 3 && (
            <div className={cn('generate-content')}>
              {Boolean(generateImageSrc) && (
                <GImg className={cn('upload-image', 'generate-image')} src={generateImageSrc} />
              )}
              <p className={cn('product-title')}>{productInfo.title}</p>
              <p className={cn('product-price')}>
                {productInfo.is_seckill ? $currency(productInfo.seckill.price) : $currency(productInfo.price)}
              </p>
              <BButton
                className={cn('shopping-now')}
                text={$t('Shopping Now')}
                btnSize="large"
                onClick={handleClickAITryShoppingNow}
              />
            </div>
          )}
        </div>
      </BDialog>
    </>
  );

  return (
    renderAITry && (
      <>
        <div className={cn('ai-try')}>
          <div className={cn('ai-try-on')} onClick={openAITry}>
            <i className={cn('iconfont', 'close')} onClick={handleDestroy}>
              &#xe640;
            </i>
            <span className={cn('text')}>{$t('AI Try On')}</span>
            <i className={cn('iconfont', 'clothing')}>&#xe7cc;</i>
          </div>
        </div>
        {renderAITryDialog()}
      </>
    )
  );
};

AITry.propTypes = {
  productInfo: PropTypes.object,
};

export default memo(AITry);
```
