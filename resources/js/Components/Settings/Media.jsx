import React, { useState, useEffect, useRef  } from 'react';
import axios from 'axios';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
  subDays
} from 'date-fns';
import { Switch, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { ChevronLeftIcon, ChevronRightIcon, ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import moment from 'moment';
import aishaImage from '../../../../public/assets/aishaImage.png';
import benImage from '../../../../public/assets/benImage.png';
import thomasImage from '../../../../public/assets/thomasImage.png';
import community1 from  '../../../../public/assets/community1.png';
import community2 from '../../../../public/assets/community2.png';
import community3 from '../../../../public/assets/community3.png';
import changeImage1 from '../../../../public/assets/lambo5.jpeg';
import changeImage2 from '../../../../public/assets/lambo2.jpeg';
import blueCheckmarkIcon from '../../../../public/assets/blueCheckmarkIcon.svg';
import LeftArrowIcon from '../../../../public/assets/leftArrowIcon.svg';
import RightArrowIcon from '../../../../public/assets/rightArrowIcon.svg';