import { Modal, Box, Typography, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FC, SetStateAction } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { object, TypeOf, nativeEnum, string, date, preprocess, number } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import CloseButton from '@/components/Common/CloseButton';
import FormInput from '@/components/Forms/FormInput';
import { ReservationTypeEnum } from '@/graphql/types';
import { useCreateGroupMutation } from '@/graphql/hooks';
import FormDatePicker from './FormDatePicker';

const newGroupSchema = object({
  type: nativeEnum(ReservationTypeEnum),
  destination: string().min(1, 'Destination is required'),
  price: preprocess((a) => parseInt(string().parse(a), 10), number().positive()),
  groupSize: preprocess((a) => parseInt(string().parse(a), 10), number().positive()),
  startDate: date(),
  endDate: date(),
  description: string().optional(),
});
type INewGroupSchema = TypeOf<typeof newGroupSchema>;

type NewGroupProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  adminId: string;
};

const NewGroupModal: FC<NewGroupProps> = ({ isModalOpen, setIsModalOpen, adminId }) => {
  const [createNewGroupMutation] = useCreateGroupMutation({
    onCompleted: () => {
      setIsModalOpen(false);
      methods.reset();
    },
    onError: () => null,
  });

  const methods = useForm<INewGroupSchema>({
    resolver: zodResolver(newGroupSchema),
  });

  const onSubmitHandler: SubmitHandler<INewGroupSchema> = async ({
    startDate,
    endDate,
    price,
    groupSize,
    description,
    ...otherDetails
  }: INewGroupSchema) => {
    createNewGroupMutation({
      variables: {
        adminId,
        details: {
          ...otherDetails,
          groupSize,
          price,
          startDate: startDate.toString(),
          endDate: endDate.toString(),
          description: description || null,
        },
      },
    });
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: '#ffffff',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <CloseButton setCloseState={setIsModalOpen} />
        <FormProvider {...methods}>
          <Box
            display="flex"
            flexDirection="column"
            component="form"
            noValidate
            autoComplete="off"
            sx={{ paddingRight: { sm: '3rem' } }}
            onSubmit={methods.handleSubmit(onSubmitHandler)}
          >
            <Typography variant="h1" component="h1" sx={{ textAlign: 'center', mb: '1.5rem' }}>
              Sukurkite nauj?? kelion??
            </Typography>
            <FormInput label="Kelion??s kryptis" type="text" name="destination" focused required />
            <FormInput
              label="Kaina"
              type="number"
              name="price"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              focused
              required
            />
            <FormInput
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              label="Viet?? skai??ius"
              type="number"
              name="groupSize"
              focused
              required
            />
            <FormInput label="Kelion??s tipas" type="text" name="type" select focused required>
              <MenuItem value={ReservationTypeEnum.Holiday}>Poilsin??</MenuItem>
              <MenuItem value={ReservationTypeEnum.Sightseeing}>Pa??intin??</MenuItem>
              <MenuItem value={ReservationTypeEnum.Universal}>Pa??intin?? + poilsin??</MenuItem>
            </FormInput>
            <FormDatePicker name="startDate" label="Prad??ios data" />{' '}
            <FormDatePicker name="endDate" label="Pabaigos data" />
            <FormInput label="Kelion??s apra??as" type="text" name="description" focused></FormInput>
            <LoadingButton
              loading={false}
              type="submit"
              variant="contained"
              sx={{
                py: '0.8rem',
                mt: 2,
                width: '80%',
                marginInline: 'auto',
              }}
            >
              Sukurti
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </Modal>
  );
};

export default NewGroupModal;
