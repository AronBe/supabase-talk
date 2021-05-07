import React, { useCallback, useState } from 'react'
import {
  CalendarDot,
  CalendarList,
  MultiDotMarking,
} from 'react-native-calendars'
import { ActionSheet, ButtonProps, Colors, Text } from 'react-native-ui-lib'
import { PlantsType } from 'features/core/api/types'
import { screenWidth } from 'features/core/utils/rnUtils'

type MarkedDateType = Record<string, MultiDotMarking>
interface IProps {
  plantId: PlantsType['id']
}

const wateringMark = {
  color: Colors.blue10,
  selectedDotColor: Colors.blue10,
}

interface ISelectedDots {
  date: string
  dots: CalendarDot[]
}

const PlantCalendar = ({ plantId }: IProps) => {
  console.log(plantId, wateringMark)
  const [markedDates, _setMarkedDates] = useState<MarkedDateType>()
  const [showActionSheet, setShowActionSheet] = useState(false)
  const [selectedDots, setSelectedDots] = useState<ISelectedDots>()

  const getActionSheetOptions = useCallback(
    (records: ISelectedDots | undefined) => {
      const options: ButtonProps[] = []
      if (!records) {
        return options
      }
    },
    []
  )

  return (
    <>
      <Text text70BO marginL-20>
        Calendar
      </Text>
      <CalendarList
        horizontal
        pagingEnabled
        markingType="multi-dot"
        calendarWidth={screenWidth}
        markedDates={{}}
        onDayPress={(item) => {
          setShowActionSheet(true)
          setSelectedDots({
            date: item.dateString,
            dots: markedDates?.[item.dateString]?.dots ?? [],
          })
        }}
      />
      <ActionSheet
        title={selectedDots?.date}
        useNativeIOS={false}
        options={getActionSheetOptions(selectedDots)}
        visible={showActionSheet}
        onDismiss={() => setShowActionSheet(false)}
        containerStyle={{ paddingBottom: 20 }}
      />
    </>
  )
}

export default PlantCalendar
