

import { validationResult } from 'express-validator';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createValidationSchema } from '../utils/validationSchema.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const eventsDataPath = path.join(__dirname, '..', 'constants', 'eventsData.json');

export const getAllEvents = async (req, res) => {
  try {
    const eventsData = await readFile(eventsDataPath, 'utf-8');
    res.json(JSON.parse(eventsData));
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const eventsData = await readFile(eventsDataPath, 'utf-8');
    const events = JSON.parse(eventsData);
    const event = events.find((event) => event.id === parseInt(id));
    if (!event) {
      return res.status(404).send('Event not found');
    }
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

export const createEvent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { body } = req;
    const eventsData = await readFile(eventsDataPath, 'utf-8');
    const events = JSON.parse(eventsData);
    const newEvent = { id: events.length + 1, ...body };
    events.push(newEvent);
    await writeFile(eventsDataPath, JSON.stringify(events));
    res.status(201).json(newEvent);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const eventsData = await readFile(eventsDataPath, 'utf-8');
    const events = JSON.parse(eventsData);
    const eventIndex = events.findIndex((event) => event.id === parseInt(id));
    if (eventIndex === -1) {
      return res.status(404).send('Event not found');
    }
    events[eventIndex] = { id: parseInt(id), ...body };
    await writeFile(eventsDataPath, JSON.stringify(events));
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

export const partialUpdateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const eventsData = await readFile(eventsDataPath, 'utf-8');
    const events = JSON.parse(eventsData);
    const eventIndex = events.findIndex((event) => event.id === parseInt(id));
    if (eventIndex === -1) {
      return res.status(404).send('Event not found');
    }
    events[eventIndex] = { ...events[eventIndex], ...body };
    await writeFile(eventsDataPath, JSON.stringify(events));
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const eventsData = await readFile(eventsDataPath, 'utf-8');
    let events = JSON.parse(eventsData);
    events = events.filter((event) => event.id !== parseInt(id));
    await writeFile(eventsDataPath, JSON.stringify(events));
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
