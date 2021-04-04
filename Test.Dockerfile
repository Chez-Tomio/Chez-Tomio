FROM debian

ARG TEST

RUN echo $TEST

COPY $TEST/* .

RUN ls
