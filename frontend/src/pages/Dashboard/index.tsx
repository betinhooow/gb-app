import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
import logoImg from '../../assets/icons/logo.svg';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
  Section,
  Appointment,
} from './styles';
import { isToday, format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { useAuth } from '../../hooks/auth';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import API from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointments {
  id: string;
  date: string;
  user: {
    name: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);

  const { signOut, user } = useAuth();

  const handleDayClick = useCallback((day: Date, modifiers: DayModifiers) => {
    if(modifiers.available){
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    API.get(`/providers/${user.id}/month-availability`, {
      params: {
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth() + 1
      }
    }).then(response => {
      setMonthAvailability(response.data);
    })
  }, [currentMonth, user.id]);

  useEffect(() => {
    API.get('/appointments/me', {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate(),
      }
    }).then(response => {
      setAppointments(response.data);
    });
  }, [selectedDate]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
    .filter(monthDay => monthDay.available === false)
    .map(monthDay => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();

      return new Date(year, month, monthDay.day);
    })
    
    return dates;
  }, [monthAvailability, currentMonth]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBr,
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', {
      locale: ptBr,
    });
  }, [selectedDate]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Agengss" />

          <Profile>
            <img src={user.avatar_url} alt="u" />
            <div>
              <span>Bem vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://cdn.discordapp.com/avatars/560843572358676483/233f6b8b8a689b5088682f3fb1b8a2fe?size=512"
                alt="name"
              />
              <strong>Roberto Nobre</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
              <img
                src="https://cdn.discordapp.com/avatars/560843572358676483/233f6b8b8a689b5088682f3fb1b8a2fe?size=512"
                alt="name"
              />
              <strong>Roberto Nobre</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
              <img
                src="https://cdn.discordapp.com/avatars/560843572358676483/233f6b8b8a689b5088682f3fb1b8a2fe?size=512"
                alt="name"
              />
              <strong>Roberto Nobre</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
              <img
                src="https://cdn.discordapp.com/avatars/560843572358676483/233f6b8b8a689b5088682f3fb1b8a2fe?size=512"
                alt="name"
              />
              <strong>Roberto Nobre</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
              <img
                src="https://cdn.discordapp.com/avatars/560843572358676483/233f6b8b8a689b5088682f3fb1b8a2fe?size=512"
                alt="name"
              />
              <strong>Roberto Nobre</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            onMonthChange={handleMonthChange}
            modifiers={{
              available: { daysOfWeek: [1,2,3,4,5]}
            }}
            selectedDays={selectedDate}
            onDayClick={handleDayClick}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro'
            ]}
           />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
