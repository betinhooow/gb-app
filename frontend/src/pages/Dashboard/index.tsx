import React, { useState, useCallback } from 'react';
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
import { useAuth } from '../../hooks/auth';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';


const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { signOut, user } = useAuth();

  const handleDayClick = useCallback((day: Date, modifiers: DayModifiers) => {
    if(modifiers.available){
      setSelectedDate(day);
    }
  }, []);

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
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
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
            disabledDays={[{ daysOfWeek: [0, 6] }]}
            modifiers={{
              available: { daysOfWeek: [1,2,3,4,5]}
            }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
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
