import React from "react";

class FirmwareProgressInfo extends React.Component {
  state = {
    jobId: null,
  };

  checkJobId(job_id) {
    return function (logLine) {
      return logLine.toLowerCase().includes(`job #${job_id}`);
    };
  }

  componentDidUpdate() {
    const element = document.getElementById("logoutputdiv");
    if (element !== null) {
      element.scrollTop = element.scrollHeight;
    }
  }

  render() {
    const { jobStatus } = this.props;
    const { jobId } = this.props;
    const { jobData } = this.props;
    let jobStartTime = "";
    let jobFinishTime = "";
    let exceptionMessage = "";
    let log = "";
    this.props.logLines.filter(this.checkJobId(jobId)).map((logLine) => {
      log += logLine;
    });

    if (jobData !== null) {
      jobStartTime = jobData.start_time;
      jobFinishTime = jobData.finish_time;
      if (jobStatus === "EXCEPTION") {
        exceptionMessage = jobData.exception.message;
      }
    }

    return (
      <div key="1">
        <p>
          status: {jobStatus} (job #{jobId})
        </p>
        <p className="error">{exceptionMessage}</p>
        <p>start time: {jobStartTime}</p>
        <p>finish time: {jobFinishTime}</p>
        <div id="logoutputdiv" className="logoutput">
          <pre>{log}</pre>
        </div>
      </div>
    );
  }
}

export default FirmwareProgressInfo;
