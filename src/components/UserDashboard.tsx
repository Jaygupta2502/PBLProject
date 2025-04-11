import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ChevronRight, Upload, AlertCircle, Ticket } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import { useAuthStore } from '../store/authStore';
import { useEventStore } from '../store/eventStore';
import { buildings, departments } from '../types/venue';
import { clubs } from '../data/clubs';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const COLORS = ['#8b5cf6', '#10B981', '#F59E0B', '#EF4444'];

const UserDashboard = () => {
  const user = useAuthStore(state => state.user);
  const { events, tickets, staffInvites, analytics, addEvent } = useEventStore();
  
  const [activeSection, setActiveSection] = useState('analytics');
  const [selectedClub, setSelectedClub] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('');
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('');
  const [inviteRole, setInviteRole] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    requirements: '',
    staffCoordinator: ''
  });

  const [fileUploads, setFileUploads] = useState({
    clubLogo: '',
    eventPoster: ''
  });

  const sidebarItems = [
    { id: 'analytics', label: 'Analytics', icon: Calendar },
    { id: 'calendar', label: 'Calendar', icon: Clock },
    { id: 'schedule', label: 'Schedule Event', icon: Upload },
    { id: 'pending', label: 'Pending Approvals', icon: AlertCircle },
    { id: 'tickets', label: 'Overlap Tickets', icon: Ticket },
    { id: 'tickets', label: 'Ticket History', icon: Users },
    { id: 'staff', label: 'Staff Invites', icon: Users },
    { id: 'history', label: 'Event History', icon: Calendar }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'clubLogo' | 'eventPoster') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileUploads(prev => ({
          ...prev,
          [type]: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add event submission logic here
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add invite submission logic here
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'analytics':
        return renderAnalytics();
      case 'calendar':
        return renderCalendar();
      case 'schedule':
        return renderScheduleForm();
      case 'pending':
        return renderPendingApprovals();
      case 'tickets':
        return renderTicketHistory();
      case 'staff':
        return renderStaffInvites();
      case 'history':
        return renderEventHistory();
      default:
        return renderAnalytics();
    }
  };

const renderAnalytics = () => (
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="space-y-8"
>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[
      {
        title: 'Total Events',
        value: analytics.totalEvents,
        color: 'indigo',
        icon: Calendar
      },
      {
        title: 'Upcoming Events',
        value: analytics.upcomingEvents.length,
        color: 'green',
        icon: Clock
      },
      {
        title: 'Pending Approvals',
        value: analytics.pendingApprovals,
        color: 'yellow',
        icon: AlertCircle
      }
    ].map((stat, index) => (
      <motion.div
        key={stat.title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`bg-white p-6 rounded-xl shadow-lg analytics-card border-l-4 border-${stat.color}-500`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-medium text-gray-600">{stat.title}</p>
            <h3 className="text-4xl font-bold mt-2 gradient-text">{stat.value}</h3>
          </div>
          <stat.icon className={`h-12 w-12 text-${stat.color}-500`} />
        </div>
      </motion.div>
    ))}
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h3 className="text-xl font-semibold mb-4">Events by Club</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={analytics.clubEvents}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="club" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="count" 
            stroke="#8b5cf6" 
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h3 className="text-xl font-semibold mb-4">Venue Usage</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={analytics.buildingUsage}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="count"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          >
            {analytics.buildingUsage.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  </div>
</motion.div>
);

  const renderCalendar = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events.map(event => ({
          title: event.title,
          start: `${event.date}T${event.startTime}`,
          end: `${event.date}T${event.endTime}`,
          backgroundColor: event.status === 'approved' ? '#10B981' : '#F59E0B',
          extendedProps: {
            club: event.club,
            venue: event.venue,
            status: event.status
          }
        }))}
        eventContent={(eventInfo) => (
          <div className="p-1">
            <div className="font-semibold">{eventInfo.event.title}</div>
            <div className="text-xs">{eventInfo.event.extendedProps.club}</div>
            <div className="text-xs">{eventInfo.event.extendedProps.venue}</div>
            <div className={`text-xs px-1 rounded-full ${
              eventInfo.event.extendedProps.status === 'approved' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {eventInfo.event.extendedProps.status}
            </div>
          </div>
        )}
        slotMinTime="09:00:00"
        slotMaxTime="17:00:00"
        allDaySlot={false}
        height="auto"
        aspectRatio={1.8}
      />
    </motion.div>
  );

  const renderScheduleForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h2 className="text-2xl font-semibold mb-6">Schedule New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Club
            </label>
            <select 
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 form-input-animate"
              value={selectedClub}
              onChange={(e) => setSelectedClub(e.target.value)}
              required
            >
              <option value="">Select a club</option>
              {clubs.map(club => (
                <option key={club} value={club}>{club}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 form-input-animate"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Club Logo
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-sm border border-gray-300 cursor-pointer hover:bg-gray-50 transition-all duration-300">
                {fileUploads.clubLogo ? (
                  <img 
                    src={fileUploads.clubLogo}
                    alt="Club Logo Preview"
                    className="h-32 w-32 object-contain image-preview"
                  />
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-500">Upload club logo</span>
                  </>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'clubLogo')}
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Poster
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-sm border border-gray-300 cursor-pointer hover:bg-gray-50 transition-all duration-300">
                {fileUploads.eventPoster ? (
                  <img 
                    src={fileUploads.eventPoster}
                    alt="Event Poster Preview"
                    className="h-32 w-32 object-contain image-preview"
                  />
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-500">Upload event poster</span>
                  </>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'eventPoster')}
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Building
            </label>
            <select 
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 form-input-animate"
              value={selectedBuilding}
              onChange={(e) => {
                setSelectedBuilding(e.target.value);
                setSelectedVenue('');
              }}
              required
            >
              <option value="">Select a building</option>
              {buildings.map(building => (
                <option key={building.id} value={building.id}>{building.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Venue
            </label>
            <select 
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 form-input-animate"
              value={selectedVenue}
              onChange={(e) => setSelectedVenue(e.target.value)}
              required
              disabled={!selectedBuilding}
            >
              <option value="">Select a venue</option>
              {selectedBuilding && buildings
                .find(b => b.id === selectedBuilding)
                ?.venues.map(venue => (
                  <option key={venue.id} value={venue.id}>
                    {venue.name} (Capacity: {venue.capacity})
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 form-input-animate"
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time (9 AM - 5 PM)
            </label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 form-input-animate"
              required
              min="09:00"
              max="17:00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Time (9 AM - 5 PM)
            </label>
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 form-input-animate"
              required
              min="09:00"
              max="17:00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Staff Coordinator
            </label>
            <select 
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 form-input-animate"
              value={formData.staffCoordinator}
              onChange={(e) => setFormData({ ...formData, staffCoordinator: e.target.value })}
              required
            >
              <option value="">Select staff coordinator</option>
              {departments.map(dept => (
                <optgroup key={dept.id} label={dept.name}>
                  {dept.staff.map(staff => (
                    <option key={staff.id} value={staff.id}>
                      {staff.name} ({staff.role})
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 form-input-animate"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Requirements
          </label>
          <textarea
            rows={3}
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 form-input-animate"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-300"
          >
            Submit Request
          </button>
        </div>
      </form>
    </motion.div>
  );

  const renderPendingApprovals = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold mb-6">Pending Approvals</h2>
      <div className="grid grid-cols-1 gap-6">
        {events
          .filter(event => event.status === 'pending')
          .map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="flex items-start p-6">
                <div className="flex-shrink-0">
                  {event.clubLogo && (
                    <img
                      src={event.clubLogo}
                      alt={`${event.club} logo`}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  )}
                </div>
                <div className="ml-6 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">{event.description}</p>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.startTime} - {event.endTime}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.venue}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {event.staffCoordinator.name}
                    </div>
                  </div>
                </div>
              </div>
              {event.eventPoster && (
                <div className="border-t border-gray-200">
                  <img
                    src={event.eventPoster}
                    alt={`${event.title} poster`}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
            </motion.div>
          ))}
      </div>
    </motion.div>
  );

  const renderTicketForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-6">Submit Overlap Ticket</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Club
              </label>
              <select 
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Select a club</option>
                {clubs.map(club => (
                  <option key={club} value={club}>{club}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Title
              </label>
              <input
                type="text"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Venue
              </label>
              <select 
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Select a venue</option>
                {venues.map(venue => (
                  <option key={venue.id} value={venue.id}>{venue.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Overlap
              </label>
              <textarea
                rows={4}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Ticket History</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 mb-4">
            <label className="text-sm font-medium text-gray-700">Filter by Club:</label>
            <select 
              className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={selectedClub}
              onChange={(e) => setSelectedClub(e.target.value)}
            >
              <option value="">All Clubs</option>
              {clubs.map(club => (
                <option key={club} value={club}>{club}</option>
              ))}
            </select>
          </div>

          {ticketHistory
            .filter(ticket => !selectedClub || ticket.club === selectedClub)
            .map(ticket => (
              <div key={ticket.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{ticket.event}</h3>
                    <p className="text-sm text-gray-500">{ticket.club}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    ticket.status === 'Resolved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {ticket.status}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {ticket.date}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {ticket.venue}
                    </div>
                  </div>
                  <p className="mt-2">
                    <span className="font-medium">Reason: </span>
                    {ticket.reason}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
  const renderTicketHistory = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold mb-6">Ticket History</h2>
      <div className="grid grid-cols-1 gap-6">
        {tickets.map((ticket, index) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  ticket.priority === 'high'
                    ? 'bg-red-100 text-red-800'
                    : ticket.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {ticket.priority}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  ticket.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : ticket.status === 'resolved'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {ticket.status}
                </span>
              </div>
            </div>
            <p className="mt-2 text-gray-600">{ticket.description}</p>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(ticket.createdAt).toLocaleDateString()}
              </div>
              {ticket.resolution && (
                <p className="text-green-600">Resolution: {ticket.resolution}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderStaffInvites = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Staff Invitations</h2>
        <button
          onClick={() => setShowInviteForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          New Invitation
        </button>
      </div>

      {showInviteForm && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-6"
        >
          <form onSubmit={handleInviteSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Staff Member
              </label>
              <select
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                disabled={!selectedDepartment}
              >
                <option value="">Select Staff Member</option>
                {selectedDepartment && departments
                  .find(d => d.id === selectedDepartment)
                  ?.staff.map(staff => (
                    <option key={staff.id} value={staff.id}>
                      {staff.name} ({staff.role})
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <input
                type="text"
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="e.g., Event Coordinator"
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowInviteForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Send Invitation
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {staffInvites.map((invite, index) => (
          <motion.div
            key={invite.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{invite.staffName}</h3>
                <p className="text-sm text-gray-500">{invite.department}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                invite.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : invite.status === 'accepted'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {invite.status}
              </span>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>Role: {invite.role}</p>
              <p className="mt-1">
                Invited on: {new Date(invite.createdAt).toLocaleDateString()}
              </p>
            </div>
            {invite.response && (
              <p className="mt-2 text-sm text-gray-600">
                Response: {invite.response}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderEventHistory = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold mb-6">Event History</h2>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Filter by Club:</label>
          <select 
            className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={selectedClub}
            onChange={(e) => setSelectedClub(e.target.value)}
          >
            <option value="">All Clubs</option>
            {clubs.map(club => (
              <option key={club} value={club}>{club}</option>
            ))}
          </select>
        </div>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
          >
            {event.eventPoster && (
              <div className="relative h-48">
                <img
                  src={event.eventPoster}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center">
                  {event.clubLogo && (
                    <img
                      src={event.clubLogo}
                      alt={event.club}
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  )}
                  <span className="ml-2 text-white font-semibold">{event.club}</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    event.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : event.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {event.date}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {event.startTime} - {event.endTime}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.venue}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {event.staffCoordinator.name}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex pt-16">
        {/* Sidebar */}
        <div className="w-64 bg-white h-[calc(100vh-4rem)] shadow-lg fixed">
          <div className="p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h2 className="text-lg font-semibold text-gray-800">{user?.club}</h2>
              <p className="text-sm text-gray-500">{user?.role}</p>
            </motion.div>
            <nav className="space-y-1">
              {sidebarItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-sm rounded-lg transition-all duration-300 sidebar-button ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className={`h-5 w-5 transition-colors duration-300 ${
                    activeSection === item.id ? 'text-indigo-600' : 'text-gray-400'
                  }`} />
                  <span>{item.label}</span>
                  <ChevronRight className={`h-4 w-4 ml-auto transition-transform duration-300 ${
                    activeSection === item.id ? 'rotate-90 text-indigo-600' : 'text-gray-400'
                  }`} />
                </motion.button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 p-8">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default UserDashboard;