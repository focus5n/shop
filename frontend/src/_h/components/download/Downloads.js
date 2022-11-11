import React from "react";
import JSZipUtils from "jszip-utils";
import JSZip, { file } from "jszip";
import { saveAs } from "file-saver";
import { ReportListView } from "../../../app/pages/admin/report/core/ReportListProvider";
import axios from "axios";

const getLink = (str) => {
  const arr = str.split('assignments/');
  return arr[arr.length - 2]
}

const getFielName = (str) => {
  const arr = str.split('assignments/');
  return arr[arr.length - 1]
}


const DownLoadButton = () => {

  const { selected, cid } = ReportListView()


  let downloadSelected = () => {
    if (selected.length === 0) {
      alert('다운 받을 수강생을 체크 해주세요')
      return
    }
    selected.map((select => {

      const link = `https://online.seoulwomen.or.kr/wp-content/plugins/project-report/api/api_file_get.php?user=${select}&cid=${cid}`

      let zip = new JSZip();
      let count = 0
      axios.get(link).then((res) => {

        const datas = res.data.data
        const user = res.data.user

        datas.map((data) => {
          const name = getFielName(data.file)
          const link = getLink(data.file)
          let file_link = data.file

          if (!file_link.includes('https')) {
            file_link = file_link.replace('http', 'https')
          }


          // console.log(file_link)
          // saveAs(file_link, 'test.hwp');
          JSZipUtils.getBinaryContent(file_link, async function (err, data) {
            if (err) {
              throw err;
            }

            zip.file(name, data, { binary: true });


            count += 1
            if (count === datas.length) {
              let zipFilename = `${user}.zip`
              let zipFile = await zip.generateAsync({ type: "blob" });
              saveAs(zipFile, zipFilename);
            }
          });

        })
      })
    }))
  }
  return (
    <button onClick={downloadSelected} type="button" className="btn btn-light-primary me-3" data-bs-toggle="modal" data-bs-target="#h_download">
      <span className="svg-icon svg-icon-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect opacity="0.3" x="12.75" y="4.25" width="12" height="2" rx="1" transform="rotate(90 12.75 4.25)" fill="currentColor" />
          <path d="M12.0573 6.11875L13.5203 7.87435C13.9121 8.34457 14.6232 8.37683 15.056 7.94401C15.4457 7.5543 15.4641 6.92836 15.0979 6.51643L12.4974 3.59084C12.0996 3.14332 11.4004 3.14332 11.0026 3.59084L8.40206 6.51643C8.0359 6.92836 8.0543 7.5543 8.44401 7.94401C8.87683 8.37683 9.58785 8.34458 9.9797 7.87435L11.4427 6.11875C11.6026 5.92684 11.8974 5.92684 12.0573 6.11875Z" fill="currentColor" />
          <path d="M18.75 8.25H17.75C17.1977 8.25 16.75 8.69772 16.75 9.25C16.75 9.80228 17.1977 10.25 17.75 10.25C18.3023 10.25 18.75 10.6977 18.75 11.25V18.25C18.75 18.8023 18.3023 19.25 17.75 19.25H5.75C5.19772 19.25 4.75 18.8023 4.75 18.25V11.25C4.75 10.6977 5.19771 10.25 5.75 10.25C6.30229 10.25 6.75 9.80228 6.75 9.25C6.75 8.69772 6.30229 8.25 5.75 8.25H4.75C3.64543 8.25 2.75 9.14543 2.75 10.25V19.25C2.75 20.3546 3.64543 21.25 4.75 21.25H18.75C19.8546 21.25 20.75 20.3546 20.75 19.25V10.25C20.75 9.14543 19.8546 8.25 18.75 8.25Z" fill="#C4C4C4" />
        </svg>
      </span>
      과제 다운로드
    </button>
  )
};




const AllDownLoadButton = () => {

  const { selected, cid, onSelectAll, isAllSelected, data } = ReportListView()

  let donwloadAll = () => {

    let zip = new JSZip();
    const link = `https://online.seoulwomen.or.kr/wp-content/plugins/project-report/api/api_file_get_all.php?cid=${cid}`

    const selected = document.querySelector('#selected')
    const title = selected.options[selected.selectedIndex].textContent
    console.log(cid)
    axios.get(link).then((res) => {
      const datas = res.data.data
      const user = res.data.user

      let count = 0
      console.log(datas.length)
      datas.map((data) => {
        const name = getFielName(data.file)
        let file_link = data.file

        if (!file_link.includes('https')) {
          file_link = file_link.replace('http', 'https')
        }


        JSZipUtils.getBinaryContent(file_link, async function (err, data) {
          if (err) {
            throw err;
          }
          zip.file(name, data, { binary: true });
          count += 1

          if (count === datas.length) {
            let zipFilename = `${title}.zip`
            let zipFile = await zip.generateAsync({ type: "blob" });
            console.log('succ')
            saveAs(zipFile, zipFilename);
          }
        });
      })
    })


  }
  return (
    <button onClick={donwloadAll} type="button" className="btn btn-light-primary me-3" data-bs-toggle="modal" data-bs-target="#h_download">
      <span className="svg-icon svg-icon-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect opacity="0.3" x="12.75" y="4.25" width="12" height="2" rx="1" transform="rotate(90 12.75 4.25)" fill="currentColor" />
          <path d="M12.0573 6.11875L13.5203 7.87435C13.9121 8.34457 14.6232 8.37683 15.056 7.94401C15.4457 7.5543 15.4641 6.92836 15.0979 6.51643L12.4974 3.59084C12.0996 3.14332 11.4004 3.14332 11.0026 3.59084L8.40206 6.51643C8.0359 6.92836 8.0543 7.5543 8.44401 7.94401C8.87683 8.37683 9.58785 8.34458 9.9797 7.87435L11.4427 6.11875C11.6026 5.92684 11.8974 5.92684 12.0573 6.11875Z" fill="currentColor" />
          <path d="M18.75 8.25H17.75C17.1977 8.25 16.75 8.69772 16.75 9.25C16.75 9.80228 17.1977 10.25 17.75 10.25C18.3023 10.25 18.75 10.6977 18.75 11.25V18.25C18.75 18.8023 18.3023 19.25 17.75 19.25H5.75C5.19772 19.25 4.75 18.8023 4.75 18.25V11.25C4.75 10.6977 5.19771 10.25 5.75 10.25C6.30229 10.25 6.75 9.80228 6.75 9.25C6.75 8.69772 6.30229 8.25 5.75 8.25H4.75C3.64543 8.25 2.75 9.14543 2.75 10.25V19.25C2.75 20.3546 3.64543 21.25 4.75 21.25H18.75C19.8546 21.25 20.75 20.3546 20.75 19.25V10.25C20.75 9.14543 19.8546 8.25 18.75 8.25Z" fill="#C4C4C4" />
        </svg>
      </span>
      전체 다운로드
    </button>
  )
};

export { DownLoadButton, AllDownLoadButton };
