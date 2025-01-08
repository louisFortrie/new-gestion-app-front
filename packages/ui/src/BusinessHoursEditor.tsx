'use client'

import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { XStack, YStack, styled, Text, Switch, Button } from 'tamagui';
import { CustomSelect } from '@my/ui';
import { Clock, Plus, Trash } from '@tamagui/lucide-icons';

type Day = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

const displayDay: Readonly<Record<Day, string>> = {
  MONDAY: 'Lundi',
  TUESDAY: 'Mardi',
  WEDNESDAY: 'Mercredi',
  THURSDAY: 'Jeudi',
  FRIDAY: 'Vendredi',
  SATURDAY: 'Samedi',
  SUNDAY: 'Dimanche',
} as const;

interface TimePeriod {
  openDay: Day;
  openTime: { hours?: number; minutes?: number };
  closeDay: Day;
  closeTime: { hours: number; minutes?: number };
}

interface BusinessHours {
  periods: TimePeriod[];
}

interface BusinessHoursEditorProps {
  businessHours: BusinessHours;
  onBusinessHoursChange: (businessHours: BusinessHours) => void;
}

const timeOptions = Array.from({ length: 49 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? '00' : '30';
  return { name: `${hour.toString().padStart(2, '0')}:${minute}` };
});

const DayContainer = styled(XStack, {
  backgroundColor: '#F8FAFC',
  borderColor: '#E2E8F0',
  borderRadius: '$4',
  borderWidth: 1,
  paddingHorizontal: '$4',
  paddingVertical: '$3',
  justifyContent: 'space-between',
});

const StyledButton = styled(Button, {
  width: 'fit-content',
});

const PeriodRow = ({ 
  period,
  dayKey,
  index,
  onUpdate,
  onDelete,
  showDelete
}: {
  period: TimePeriod
  dayKey: Day
  index: number
  onUpdate: (updatedPeriod: TimePeriod) => void
  onDelete: () => void
  showDelete: boolean
}) => {
  const [localPeriod, setLocalPeriod] = useState(period);

  useEffect(() => {
    setLocalPeriod(period);
  }, [period]);

  const openTimeValue = useMemo(() => {
    if (localPeriod.closeTime.hours === 24 && !localPeriod.openTime.hours) return '24h/24';
    return `${localPeriod.openTime.hours?.toString().padStart(2, '0') || '00'}:${
      localPeriod.openTime.minutes?.toString().padStart(2, '0') || '00'
    }`;
  }, [localPeriod]);

  const closeTimeValue = useMemo(() => {
    return `${localPeriod.closeTime.hours?.toString().padStart(2, '0')}:${
      localPeriod.closeTime.minutes?.toString().padStart(2, '0') || '00'
    }`;
  }, [localPeriod]);

  const is24Hours = period.closeTime.hours === 24 && !period.openTime.hours;

  const handleOpenTimeChange = useCallback((value: string) => {
    if (value === '24h/24') {
      const newPeriod = {
        ...period,
        openTime: {},
        closeTime: { hours: 24 }
      };
      onUpdate(newPeriod);
      setLocalPeriod(newPeriod);
    } else {
      const [hours, minutes] = value.split(':').map(Number);
      const newPeriod = {
        ...period,
        openTime: { hours, minutes }
      };
      onUpdate(newPeriod);
      setLocalPeriod(newPeriod);
    }
  }, [period, onUpdate]);

  const handleCloseTimeChange = useCallback((value: string) => {
    const [hours, minutes] = value.split(':').map(Number);
    onUpdate({
      ...period,
      closeTime: {
        hours: value.split(':')[0] === '00' ? 24 : hours,
        minutes
      }
    });
  }, [period, onUpdate]);

  return (
    <XStack gap={16} f={1}>
      <CustomSelect
        width={'46%'}
        value={is24Hours ? '24h/24' : openTimeValue}
        options={timeOptions.concat({ name: '24h/24' })}
        iconAfter={<Clock />}
        onChange={handleOpenTimeChange}
      />
      {!is24Hours && (
        <CustomSelect
          width={'46%'}
          value={closeTimeValue}
          options={timeOptions}
          iconAfter={<Clock />}
          onChange={handleCloseTimeChange}
        />
      )}
      {showDelete && (
        <Button theme={'red'} icon={<Trash />} onPress={onDelete} />
      )}
    </XStack>
  );
};

const DaySection = ({ 
  day,
  periods,
  onChange
}: {
  day: Day
  periods: TimePeriod[]
  onChange: (periods: TimePeriod[]) => void
}) => {
  const handleToggle = useCallback((checked: boolean) => {
    if (checked) {
      onChange([{
        openDay: day,
        openTime: {},
        closeDay: day,
        closeTime: { hours: 24 }
      }]);
    } else {
      onChange([]);
    }
  }, [day, onChange]);

  const updatePeriod = useCallback((index: number, updatedPeriod: TimePeriod) => {
    const newPeriods = [...periods];
    newPeriods[index] = updatedPeriod;
    onChange(newPeriods);
  }, [periods, onChange]);

  const deletePeriod = useCallback((index: number) => {
    
    onChange(periods.filter((_, i) => i !== index));
  }, [periods, onChange]);

  const addPeriod = useCallback(() => {
    onChange([
      ...periods,
      {
        openDay: day,
        openTime: {},
        closeDay: day,
        closeTime: { hours: 24 }
      }
    ]);
  }, [day, periods, onChange]);

  return (
    <DayContainer>
      <Text width={100}>{displayDay[day]}</Text>
      <XStack alignItems="center" height={'fit-content'} gap={16}>
        <Switch
          backgroundColor={'#CDF463'}
          size={'$3'}
          checked={periods.length > 0}
          onCheckedChange={handleToggle}
        >
          <Switch.Thumb animation={'quick'} />
        </Switch>
        <Text>{periods.length > 0 ? 'Ouvert' : 'Fermé'}</Text>
      </XStack>
      <YStack gap={8} width={'75%'}>
        {periods.length > 0 && (
          <>
            {periods.map((period, index) => (
              <PeriodRow
                key={`${day}-${index}`}
                period={period}
                dayKey={day}
                index={index}
                onUpdate={(updatedPeriod) => updatePeriod(index, updatedPeriod)}
                onDelete={() => deletePeriod(index)}
                showDelete={index > 0}
              />
            ))}
            <Button icon={<Plus />} onPress={addPeriod} alignSelf='flex-start'>
              Ajouter des horaires
            </Button>
          </>
        )}
      </YStack>
    </DayContainer>
  );
};

export const BusinessHoursEditor = memo(({ 
  businessHours,
  onBusinessHoursChange 
}: BusinessHoursEditorProps) => {
  const days = useMemo(() => Object.keys(displayDay) as Day[], []);
  
  const [periodsByDay, setPeriodsByDay] = useState(() => {
    const initial: Record<Day, TimePeriod[]> = {
      MONDAY: [],
      TUESDAY: [],
      WEDNESDAY: [],
      THURSDAY: [],
      FRIDAY: [],
      SATURDAY: [],
      SUNDAY: [],
    };
    console.log("initial", initial);
    
    businessHours.periods.forEach(period => {
      initial[period.openDay].push(period);
    });

    return initial;
  });

  const handleDayChange = useCallback((day: Day, newPeriods: TimePeriod[]) => {
    console.log("handleDayChange", day, newPeriods);
    
    setPeriodsByDay(prev => ({
      ...prev,
      [day]: newPeriods
    }));
  }, []);

  useEffect(() => {
    const periods = Object.values(periodsByDay).flat();
    console.log("periods", periods);
    
    onBusinessHoursChange({ periods });
  }, [periodsByDay, onBusinessHoursChange]);

  return (
    <YStack gap={16}>
      {days.map(day => (
        <DaySection
          key={day}
          day={day}
          periods={periodsByDay[day]}
          onChange={(periods) => handleDayChange(day, periods)}
        />
      ))}
    </YStack>
  );
});

BusinessHoursEditor.displayName = 'BusinessHoursEditor';