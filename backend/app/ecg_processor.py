# backend/app/ecg_processor.py

import wfdb
import numpy as np
from biosppy.signals import ecg

def process_ecg(record_path):
    record = wfdb.rdrecord(record_path)
    signal = record.p_signal[:, 0]  # Assuming single-channel ECG
    fs = record.fs

    out = ecg.ecg(signal=signal, sampling_rate=fs, show=False)
    rpeaks = out['rpeaks']
    heart_rate = out['heart_rate']
    heart_rate_ts = out['heart_rate_ts']
    average_hr = np.mean(heart_rate)

    return {
        "rpeaks": rpeaks.tolist(),
        "heart_rate": heart_rate.tolist(),
        "heart_rate_ts": heart_rate_ts.tolist(),
        "average_hr": average_hr
    }

