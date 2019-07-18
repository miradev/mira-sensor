#!/bin/sh
curl --data "motion_center_x=$1&motion_center_y=$2&args=$*" localhost:3456/reflect
