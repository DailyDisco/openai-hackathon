FROM amazonlinux:2

# Install Python
RUN yum install -y python37 && \
    yum install -y python3-pip && \
    yum install -y zip && \
    yum clean all

# Set up PIP and Venv
RUN python3.7 -m pip install --upgrade pip && \
    python3.7 -m pip install virtualenv
RUN python3.7 -m venv base
RUN source base/bin/activate

# Install dependencies
COPY ./requirements.txt .
RUN pip install --upgrade pip
# RUN pip install wheel
# RUN pip install pyaudio
# RUN amazon-linux-extras install epel -y
# RUN yum install -y portaudio-devel python3-pyaudio python3-devel gcc-c++ libffi-devel openssl-devel -y
# RUN python3 -m pip install pyaudio
# RUN CFLAGS="-I/opt/homebrew/include -L/opt/homebrew/lib" python3 -m pip install pyaudio’
RUN yum install git -y
RUN pip install -r requirements.txt -t ./python
# RUN pip install "git+https://github.com/openai/whisper.git" 
RUN pip install ffmpeg-python==0.2.0

# Zip it up for deployment.
RUN zip -r layer.zip ./python/
ENTRYPOINT ["/bin/bash", "-l"]