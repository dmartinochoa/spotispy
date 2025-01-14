PGDMP     8    4                y           spotispy    13.2    13.2     "           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            #           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            $           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            %           1262    17463    spotispy    DATABASE     d   CREATE DATABASE spotispy WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE spotispy;
                postgres    false                        3079    17464    postgis 	   EXTENSION     ;   CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;
    DROP EXTENSION postgis;
                   false            &           0    0    EXTENSION postgis    COMMENT     g   COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';
                        false    2            �            1259    18571 
   autoincacc    SEQUENCE     {   CREATE SEQUENCE public.autoincacc
    START WITH 2
    INCREMENT BY 1
    MINVALUE 0
    MAXVALUE 99999999999
    CACHE 1;
 !   DROP SEQUENCE public.autoincacc;
       public          postgres    false            �            1259    18479    accounts    TABLE     �  CREATE TABLE public.accounts (
    id integer DEFAULT nextval('public.autoincacc'::regclass) NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(100) NOT NULL,
    gender character varying(1) DEFAULT 'o'::character varying NOT NULL,
    birthday date,
    img character varying(200) DEFAULT 'https://i.imgur.com/UsbqJKV.jpg'::character varying NOT NULL
);
    DROP TABLE public.accounts;
       public         heap    postgres    false    209            �            1259    18566 
   autoincpos    SEQUENCE     w   CREATE SEQUENCE public.autoincpos
    START WITH 1
    INCREMENT BY 1
    MINVALUE 0
    MAXVALUE 9999999
    CACHE 1;
 !   DROP SEQUENCE public.autoincpos;
       public          postgres    false            �            1259    18490 	   positions    TABLE     �   CREATE TABLE public.positions (
    id bigint DEFAULT nextval('public.autoincpos'::regclass) NOT NULL,
    geom public.geometry,
    genre character varying,
    artist character varying,
    "idUser" integer,
    username character varying
);
    DROP TABLE public.positions;
       public         heap    postgres    false    208    2    2    2    2    2    2    2    2                      0    18479    accounts 
   TABLE DATA                 public          postgres    false    206   �                 0    18490 	   positions 
   TABLE DATA                 public          postgres    false    207   �       �          0    17771    spatial_ref_sys 
   TABLE DATA                 public          postgres    false    202   �       '           0    0 
   autoincacc    SEQUENCE SET     9   SELECT pg_catalog.setval('public.autoincacc', 18, true);
          public          postgres    false    209            (           0    0 
   autoincpos    SEQUENCE SET     :   SELECT pg_catalog.setval('public.autoincpos', 289, true);
          public          postgres    false    208            �           2606    18570    accounts accounts_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.accounts DROP CONSTRAINT accounts_pkey;
       public            postgres    false    206            �           2606    18557    positions positions_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.positions
    ADD CONSTRAINT positions_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.positions DROP CONSTRAINT positions_pkey;
       public            postgres    false    207               �   x����j�@D����ɆAc�N.��%B���5�4ƣQf!��#A~ �\�����U���q�������b	2f��l'��#jA`B羌]<�Q=�b����Ǚ���n/u{��&/	�^8/�/s��LdlG3Y��(���#+0�%
�����F��h�`�ԯc	3z��r����w�~rOi��e5ص����|}�%�����Q��p���t~��	�M���E߈$��           x���oo�0���)�j�D�(P�����t����5��ƎlCŷ��	i]5ŉd_%��t~���?LK6�_~g��YP��R�,)i�9-�B����b�-�bgT<�g-�u��^�'~�8y`�Y�Śi۝����0�(�g�N���s��vS>���2w�*�6J��)�jU�ʇ|8�nn�]l�����ƴ�~L����@&%UI��=ְ�(��pn�P�h�����D6rke�,�������d��_�#�&���Q�;�iGa)��D�!
l7� �+<��B6GU�8�}L-��CE�(�檪P�(Խ�\��19�v��Z�,⤻.�`l�+?I ���l�epr��`���5�ݳ�ּ�����}�R�Ly��VǠ���~���~�V��(��n�NO2�C�Ն{�IJ[�&yQڸ�x˱�y	��aG�A�>�7���cM��<�9�G��?�C������)��*1j���AЋ�+�C��y�����n7��"_Ic���f��$#m�pC=�5J����֕�����R9G^      �   
   x���         