import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function SettingsForm({updatePlot, setDrawSettings}) {

    return (
        <>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column >Расстояние между узлами, мм</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="0.1" defaultValue="2.0" onChange={e => setDrawSettings({ delta: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Экструзия, ед./мм</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="0.01" defaultValue="0.03" onChange={e => setDrawSettings({ e_per_mm: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Z, мм</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="0.01" defaultValue="0.25" onChange={e => setDrawSettings({ z: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Float</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="10" defaultValue="2400" onChange={e => setDrawSettings({ f: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Размер печати, мм</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="1" defaultValue="120" onChange={e => setDrawSettings({ print_size_mm: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Размер стола, мм</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="1" defaultValue="200" onChange={e => setDrawSettings({ table_size_mm: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Оффсет X, мм</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="1" defaultValue="0" onChange={e => setDrawSettings({ offset_x: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Оффсет Y, мм</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="1" defaultValue="0" onChange={e => setDrawSettings({ offset_y: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Экструдер</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="1" min="0" max="1" defaultValue="0" onChange={e => setDrawSettings({ tool: e.target.value })} />
                    </Col>
                </Form.Group>
            </Form>
            <Button onClick={() => updatePlot()}>Обновить</Button>
            
        </>
    );
}


