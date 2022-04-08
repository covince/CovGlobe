FROM golang:1.18-alpine as build
WORKDIR /
ENV GOPATH=/go
ARG SRC_FOLDER=/go/src/covglobe-api
RUN mkdir -p ${SRC_FOLDER}
WORKDIR ${SRC_FOLDER}
COPY ./go.mod ./go.sum ./
COPY server.go .
RUN go mod download
RUN GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" server.go

FROM alpine:latest
WORKDIR /usr/local/share
COPY --from=build /go/src/covglobe-api/server .
COPY --from=data \
  /root/aggregated.csv.gz \
  /root/aliases.json \
  ./

ENTRYPOINT [ "/usr/local/share/server" ]
