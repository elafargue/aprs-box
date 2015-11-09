#!/bin/sh
SEQ=`cat /tmp/seq`
SEQ=$(expr \( $SEQ + 1 \) % 100)
echo $SEQ | tee /tmp/seq
