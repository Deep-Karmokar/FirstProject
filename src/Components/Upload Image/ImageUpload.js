import React, { Component } from "react";

export class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = { file: "", imagePreviewUrl: "" };
  }

  _handleSubmit(e) {
    e.preventDefault();
    console.log("handle uploading-", this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    this.props.imageChanged(reader);
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img alt="" src={imagePreviewUrl} />;
    } else {
      $imagePreview = (
        <div className="previewText">Upload Your Event Banner</div>
      );
    }

    return (
      <div className="previewComponent">
        <form onSubmit={e => this._handleSubmit(e)}>
          <div className="imgPreview">{$imagePreview}</div>
          <input
            className="fileInput"
            type="file"
            onChange={e => this._handleImageChange(e)}
          />
        </form>
      </div>
    );
  }
}

export default ImageUpload;
