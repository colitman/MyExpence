#!/bin/bash

isHeroku=true
sed -i "s/\(environment\.heroku=\).*\$/\1${isHeroku}/" ./src/main/resources/application.properties