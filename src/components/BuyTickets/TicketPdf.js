import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { jsPDF } from 'jspdf';
// eslint-disable-next-line import/no-extraneous-dependencies
import html2canvas from 'html2canvas';
// eslint-disable-next-line import/no-extraneous-dependencies
import JsBarcode from 'jsbarcode';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment-timezone';
// eslint-disable-next-line import/no-extraneous-dependencies
import { format, parseISO } from 'date-fns';
import { uploadTicket } from '../../store/actions/uploadTicket';

function TicketPdf(props) {
  const {
    photo, title, price, duration, dateString, hour, row, seat,
  } = props;
  const pdfRef = useRef();
  const [barcodeData, setBarcodeData] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const user = useSelector((state) => state.userData.data.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const length = 20;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, result, {
      format: 'CODE128',
      displayValue: true,
      width: 1,
      height: 80,
      fontSize: 0,
      margin: 0,
    });
    setBarcodeData(canvas.toDataURL('image/png'));
  }, []);

  const convertImageToBase64 = (url) => new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = reject;
    img.src = url;
  });

  useEffect(() => {
    if (photo) {
      convertImageToBase64(`http://localhost:4000/${photo}`).then((base64) => {
        setImageBase64(base64);
        setImageLoaded(true);
      });
    }
  }, [photo]);

  const generatePdf = () => {
    if (!imageLoaded) {
      console.error('Image not loaded yet');
      return;
    }

    html2canvas(pdfRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('ticket.pdf');
    });
  };

  const generatePdfEmail = useCallback(async () => {
    if (!imageLoaded) {
      console.error('Image not loaded yet');
      return;
    }

    const canvas = await html2canvas(pdfRef.current);
    const imgData = canvas.toDataURL('image/png');
    // eslint-disable-next-line new-cap
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);

    const pdfOutput = pdf.output('blob');

    const userConfirmed = window.confirm('Are you sure you want to send a PDF ticket by email?');

    if (!userConfirmed) {
      return;
    }

    if (pdfOutput) {
      const formData = new FormData();
      formData.append('pdf', pdfOutput, 'ticket.pdf');
      formData.append('email', user.email);

      try {
        const result = await dispatch(uploadTicket(formData));
        if (uploadTicket.fulfilled.match(result)) {
          toast.success('PDF of the flight has been sent to your email', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error('Something went wrong, please try again later', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        console.log(result);
      } catch (error) {
        console.error('Error uploading ticket:', error);
      }
    }
  }, [dispatch, user, imageLoaded]);

  const convertDuration = (minutes) => {
    const dur = moment.duration(minutes, 'minutes');
    const hours = dur.hours();
    const remainingMinutes = dur.minutes();
    return `${hours}h. ${remainingMinutes}min.`;
  };

  const formattedDuration = convertDuration(duration);
  const date = format(parseISO(dateString), 'EEE.-MMM.dd');

  return (
    <div style={{ background: '#1e1e1e', marginBottom: 50 }}>
      <div className="ticket__pdf" ref={pdfRef}>
        <div className="ticket__pdf__first">
          <div className="ticket__pdf__first__img">
            {imageBase64 ? (
              <img src={imageBase64} alt="movie" />
            ) : (
              <p>Loading image...</p>
            )}
          </div>
          <div className="ticket__pdf__first__info">
            <div className="ticket__pdf__first__info__title">
              <h2 className="ticket__pdf__first__info__title__text">{title}</h2>
              <p className="ticket__pdf__first__info__title__price">{`$${price}`}</p>
            </div>
            <div className="ticket__pdf__first__info__duration">
              <p className="ticket__pdf__first__info__duration__content">
                {formattedDuration}
              </p>
            </div>
            <div className="ticket__pdf__first__info__theater">
              <span className="ticket__pdf__first__info__theater__span">Theater</span>
              <p className="ticket__pdf__first__info__theater__p">Play Cinema San Jose, CA</p>
            </div>
            <div className="ticket__pdf__first__info__datetime">
              <div className="ticket__pdf__first__info__datetime__first">
                <span className="ticket__pdf__first__info__datetime__first__span">Date</span>
                <p className="ticket__pdf__first__info__datetime__first__p">{date}</p>
              </div>
              <div className="ticket__pdf__first__info__datetime__second">
                <span className="ticket__pdf__first__info__datetime__second__span">Time</span>
                <p className="ticket__pdf__first__info__datetime__second__p">{`${hour}PM`}</p>
              </div>
            </div>
            <div className="ticket__pdf__first__info__rowseat">
              <p className="ticket__pdf__first__info__rowseat__row">{row}</p>
              <p className="ticket__pdf__first__info__rowseat__seat">{seat}</p>
            </div>
          </div>
        </div>
        <div className="ticket__pdf__second">
          <img
            src={barcodeData}
            alt="barcode"
          />
        </div>
      </div>
      <div className="ticket__pdf__btn">
        <button className="ticket__pdf__btn__send" type="submit" onClick={generatePdfEmail}>SEND YOUR EMAIL?</button>
        <button className="orange__btn" type="submit" onClick={generatePdf}>Download PDF</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default TicketPdf;
