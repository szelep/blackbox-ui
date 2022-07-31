import {
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { requestService } from '../services/requestService';
import { API_ROUTES } from '../constants/ApiRoutes';
import { ContentLoader } from '../components/ContentLoader';
import { CapsuleForm } from '../components/Capsule.form';
import { useSnackbar } from '../providers/SnackbarProvider';
import { useReloadListener } from '../providers/ReloadListenerProvider';
import { CapsuleSummary } from '../components/Summary/Capsule.summary';
import { CapsuleContent } from '../components/Preview/CapsuleContent';
import { BackdropReloader } from '../components/BackdropReloader';

/**
 * Main page dashboard.
 *
 * @returns {Dashboard}
 */
export function Dashboard({ preview }) {
  const { id: capsuleId } = useParams();
  const {
    success, error,
  } = useSnackbar();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [capsuleData, setCapsuleData] = useState(null);
  const {
    watch, reload,
  } = useReloadListener();

  useEffect(() => {
    setLoaded(false);
    if (!capsuleId) {
      setLoaded(true);

      return;
    }

    const loadApiData = async () => {
      try {
        const { data } = await requestService.get(API_ROUTES.item.replace(':id', capsuleId));
        setCapsuleData(data);
      } catch (requestError) {
        error('Capsule not found!');
        navigate('/');
      }

      setLoaded(true);
    };

    loadApiData();
  }, [capsuleId, watch('capsule')]);

  const onSubmit = async (payload, setError, onRequestDone) => {
    const submitFunc = capsuleData ? requestService.put : requestService.post;
    const url = capsuleData ? API_ROUTES.item.replace(':id', capsuleId) : API_ROUTES.collection;
    try {
      const { data } = await submitFunc(url, payload);
      if (data?.id) {
        navigate(`/e/${data.id}`);
        success(`Your capsule has been ${capsuleData ? 'modified' : 'created'} successfully!`);
        reload('capsule');
      }

      return;
    } catch (requestError) {
      error('An error occured.');
      const violations = requestError?.response?.data?.violations || [];
      violations.forEach(({
        message, propertyPath,
      }) => {
        setError(
          propertyPath,
          {
            type: 'manual',
            message,
          }
        );
      });
    }

    onRequestDone();
  };

  if (!loaded) {
    return <ContentLoader />;
  }

  const publicationDate = capsuleData?.publishAt ? new Date(capsuleData.publishAt) : null;

  if (preview && !!capsuleData) {
    return (
      <>
        <BackdropReloader publicationDate={publicationDate} />
        <CapsuleContent data={capsuleData} />
      </>
    );
  }

  return (
    <>
      {!!capsuleData && (
      <>
        <BackdropReloader publicationDate={publicationDate} />
        <CapsuleSummary data={capsuleData} />
      </>
      )}
      <CapsuleForm
        initialData={capsuleData}
        editMode={!!capsuleData}
        onSubmit={onSubmit}
      />
    </>
  );
}

Dashboard.propTypes = {
  preview: PropTypes.bool,
};

Dashboard.defaultProps = {
  preview: false,
};
