--
-- PostgreSQL database dump
--

\restrict ZbckgpOaFiUMLhT9cJkjdSUOSXW3dSMqQ2YB7K5pMEY5EdeXdvkn3NLhblOoTjI

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: ambiente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ambiente (id_ambiente, nome) FROM stdin;
1	Escritorio
4	Quarto
5	Banheiro
2	Quarto visita
6	Sala
\.


--
-- Data for Name: cor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cor (id_cor, nome, fabricante, valor_chapa, foto) FROM stdin;
\.


--
-- Data for Name: movel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movel (id_movel, nome, foto, id_ambiente) FROM stdin;
\.


--
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.status (id_status, nome, cor) FROM stdin;
1	Pendente	Amarelo
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (id_usuario, cpf, nome, email, senha, tipo) FROM stdin;
1	12345678901	Tiffany Bolzan	tiffany@email.com	123456	ADMIN
\.


--
-- Data for Name: orcamento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orcamento (id_orcamento, data, valor, resposta_adm, id_usuario, id_status) FROM stdin;
1	2026-06-04	\N	\N	1	1
\.


--
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.item (id_item, comprimento, altura, largura, foto, descricao, id_orcamento, id_movel, id_cor, valor_estimado) FROM stdin;
\.


--
-- Name: ambiente_id_ambiente_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ambiente_id_ambiente_seq', 6, true);


--
-- Name: cor_id_cor_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cor_id_cor_seq', 1, false);


--
-- Name: item_id_item_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.item_id_item_seq', 1, false);


--
-- Name: movel_id_movel_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movel_id_movel_seq', 2, true);


--
-- Name: orcamento_id_orcamento_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orcamento_id_orcamento_seq', 1, true);


--
-- Name: status_id_status_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.status_id_status_seq', 1, true);


--
-- Name: usuario_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_id_usuario_seq', 1, true);


--
-- PostgreSQL database dump complete
--

\unrestrict ZbckgpOaFiUMLhT9cJkjdSUOSXW3dSMqQ2YB7K5pMEY5EdeXdvkn3NLhblOoTjI

